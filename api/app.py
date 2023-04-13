import re
import nltk
import pickle
nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences

vocab_size = 30000
embedding_dim = 32
max_length = 300
trunc_type='post'
padding_type='post'
oov_tok = "<OOV>"

from keras_preprocessing.text import tokenizer_from_json
import json
with open('./models/b3_tokenizer.json') as f:
    data = json.load(f)
    tokenizer = tokenizer_from_json(data)

#------------------------------------

from flask import Flask
from flask_cors import CORS
from flask_cors import cross_origin

app = Flask(__name__)
cors = CORS(app)

cors = CORS(app, origins=["http://localhost:3000"])


#-----------------------------------



# converting the all reviews into the lower case.
def lowercase_text(text):
    return " ".join(x.lower() for x in str(text).split())


# Removing the HTML tags and URLs from the reviews.
def clean_text(text):
    soup = BeautifulSoup(text, 'html.parser')
    text = soup.get_text()
    text = re.sub(r"http\S+", "", text)
    return text

# Perform the Contractions on the reviews.
# Example: it won’t be converted as it will not be
def contractions(s):
 s = re.sub(r"won't", "will not",s)
 s = re.sub(r"could't", "could not",s)
 s = re.sub(r"would't", "would not",s)
 s = re.sub(r"\'d", "would",s)
 s = re.sub(r"can\'t", "can not",s)
 s = re.sub(r"n\'t",  "not", s)
 s= re.sub(r"\'re", "are", s)
 s = re.sub(r"\'s", "is", s)
 s = re.sub(r"\'ll", "will", s)
 s = re.sub(r"\'t", "not", s)
 s = re.sub(r"\'ve", "have", s)
 s = re.sub(r"\'m", "am", s)
 return s

# Remove non-alpha characters

def remove_non_alpha(text):
    tokens = nltk.word_tokenize(text)
    cleaned_tokens = [re.sub('[^A-Za-z]+', '', token) for token in tokens]
    return " ".join(cleaned_tokens)

def remove_extra_spaces(text):
    return re.sub(' +', ' ', text)

stop_words = stopwords.words('english')

def remove_stopwords(text):
    tokens = text.split()
    filtered_tokens = [token for token in tokens if token not in stop_words]
    return " ".join(filtered_tokens)

def lemmatize_text(text):
    lemmatizer = WordNetLemmatizer()
    tokens = nltk.word_tokenize(text)
    return " ".join([lemmatizer.lemmatize(token) for token in tokens])


#-----------------------------------

# Transforming abbreviations
abbreviations = {
    u"he's": "he is", 
    u"there's": "there is", 
    u"We're": "We are", 
    u"That's": "That is", 
    u"won't": "will not", 
    u"they're": "they are", 
    u"Can't": "Cannot", 
    u"wasn't": "was not", 
    u"don\x89Ûªt": "do not", 
    u"aren't": "are not", 
    u"isn't": "is not", 
    u"What's": "What is", 
    u"haven't": "have not", 
    u"hasn't": "has not", 
    u"There's": "There is", 
    u"He's": "He is", 
    u"It's": "It is", 
    u"You're": "You are", 
    u"I'M": "I am", 
    u"shouldn't": "should not", 
    u"wouldn't": "would not", 
    u"i'm": "I am", 
    u"I\x89Ûªm": "I am", 
    u"I'm": "I am", 
    u"Isn't": "is not", 
    u"Here's": "Here is", 
    u"you've": "you have", 
    u"you\x89Ûªve": "you have", 
    u"we're": "we are", 
    u"what's": "what is", 
    u"couldn't": "could not", 
    u"we've": "we have", 
    u"it\x89Ûªs": "it is", 
    u"doesn\x89Ûªt": "does not", 
    u"It\x89Ûªs": "It is", 
    u"Here\x89Ûªs": "Here is", 
    u"who's": "who is", 
    u"I\x89Ûªve": "I have", 
    u"y'all": "you all", 
    u"can\x89Ûªt": "cannot", 
    u"would've": "would have", 
    u"it'll": "it will", 
    u"we'll": "we will", 
    u"wouldn\x89Ûªt": "would not", 
    u"We've": "We have", 
    u"he'll": "he will", 
    u"Y'all": "You all", 
    u"Weren't": "Were not", 
    u"Didn't": "Did not", 
    u"they'll": "they will", 
    u"they'd": "they would", 
    u"DON'T": "DO NOT", 
    u"That\x89Ûªs": "That is", 
    u"they've": "they have", 
    u"i'd": "I would", 
    u"should've": "should have", 
    u"You\x89Ûªre": "You are", 
    u"where's": "where is", 
    u"Don\x89Ûªt": "Do not", 
    u"we'd": "we would", 
    u"i'll": "I will", 
    u"weren't": "were not", 
    u"They're": "They are", 
    u"Can\x89Ûªt": "Cannot", 
    u"you\x89Ûªll": "you will", 
    u"I\x89Ûªd": "I would", 
    u"let's": "let us", 
    u"it's": "it is", 
    u"can't": "cannot", 
    u"don't": "do not", 
    u"you're": "you are", 
    u"i've": "I have", 
    u"that's": "that is", 
    u"i'll": "I will", 
    u"doesn't": "does not",
    u"i'd": "I would", 
    u"didn't": "did not", 
    u"ain't": "am not", 
    u"you'll": "you will", 
    u"I've": "I have", 
    u"Don't": "do not", 
    u"I'll": "I will", 
    u"I'd": "I would", 
    u"Let's": "Let us", 
    u"you'd": "You would", 
    u"It's": "It is", 
    u"Ain't": "am not", 
    u"Haven't": "Have not", 
    u"Could've": "Could have", 
    u"youve": "you have",   
    u"donå«t": "do not", 
}
 
def transform_abb(text):
    for emot in abbreviations:
        text = re.sub(u'('+emot+')', " ".join(abbreviations[emot].replace(",","").split()), text)
    return text

  
stop_words = set(stopwords.words('english'))

def remove_stop_words(text):
    words = text.split(' ')
    arr = [w for w in words if not w in stop_words]
    return ' '.join(arr)



def clean_text(text):
    text = re.sub(r'http[^ ]* ', '', text)
    text = re.sub(r'#\S* ', '', text)
    text = re.sub(r'@\S* ', '', text)
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'[^\w\s]', '', text)
    text = re.sub(r'\s\s+', ' ', text)
    text = text.lower()
    text = transform_abb(text)
    stopwords_list = stopwords.words('english')
    text = spell_check(text)
    text = ' '.join([word for word in text.split() if word not in stopwords_list])
    stemmer = PorterStemmer()
    text = ' '.join([stemmer.stem(word) for word in text.split()])
    return text


# Load the five pre-trained models and store them in a list
models = [
    tf.keras.models.load_model('./models/c1_bilstm_model_acc_0.923.h5'),  # Index 0
    tf.keras.models.load_model('./models/c1_cnn_model_acc_0.933.h5'),  # Index 1
    tf.keras.models.load_model('./models/c1_hybrid_model_acc_0.924.h5'),         # Index 2
    tf.keras.models.load_model('./models/c1_lstm_model_acc_0.925.h5'),         # Index 3
    tf.keras.models.load_model('./models/c1_snn_model_acc_0.852.h5'),      # Index 4
]

# Corresponding model names for each index in the 'models' list
model_names = [
    'BILSTM Model',   # Index 0
    'CNN Model',   # Index 1
    'Hybrid Model',          # Index 2
    'LSTM Model',          # Index 3
    'SNN Model',       # Index 4
]



classes_twitter = ['Positive', 'Negative', "Litigious", "Uncertainity"]
classes_imdb = ['Positive', 'Negative']

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def prediction():
    data = request.get_json()
    model_index = data.get('model_index', 4)
    if model_index < 0 or model_index > 5:
        model_index = 4
    model = models[model_index]
    
    
    s = data.get('text', "I am happy")
    sequences = tokenizer.texts_to_sequences([s])
    padded = pad_sequences(sequences, maxlen=max_length, padding=padding_type, truncating=trunc_type)
    x = model.predict(padded)[0]
    if model_index % 2 == 0:
        maxIndex = 0
        if x[0] < x[1]:
            maxIndex = 1
        return classes_twitter[maxIndex] + ", Confidence: " + str(x[maxIndex])
        # return classes_twitter[np.argmax(x)] + ", Confidence: " + str(x[np.argmax(x)])
    else:
        return classes_imdb[np.argmax(x)] + ", Confidence: " + str(x[np.argmax(x)])
    
# Predict all route
@app.route('/predict_sentiment', methods=['POST'])
@cross_origin()
def prediction_all():
    data = request.get_json()
    text = data.get('text', None)
    if text is None:
        return jsonify({'error': 'No text provided'})
    # text = clean_text(text)
    text = lowercase_text(text)
    text = clean_text(text)
    text = remove_non_alpha(text)
    text = remove_extra_spaces(text)
    text = remove_stopwords(text)
    text = lemmatize_text(text)
    unseen_processed = [text]

    # processed_text = text
    # sequences = tokenizer.texts_to_sequences([text])
    # padded = pad_sequences(sequences, maxlen=max_length, padding=padding_type, truncating=trunc_type)
    unseen_tokenized = tokenizer.texts_to_sequences([text])
    unseen_padded = pad_sequences(unseen_tokenized, padding='post', maxlen=100)
    
    overall_prediction = 0
    results = []

    for i in range(len(models)):
        model_name = model_names[i]
        model = models[i]

        prediction = model.predict(unseen_padded)[0][0]
        # Convert score to sentiment label
        prediction = float(prediction)
        if prediction> 0.5:
            sentiment_label = 'Positive'
        else:
            sentiment_label = 'Negative'
            prediction = 1 - prediction

        
        result = {
            'model': model_name,
            'prediction': sentiment_label,
            'confidence': int(prediction * 10000) / 100 
        }
        results.append(result)

    

    return jsonify({'results': results})

@app.route('/sum', methods=['POST'])
def sum_numbers():
    data = request.get_json()
    numbers = data['numbers']
    result = sum(numbers)
    return jsonify({'result': result})

@app.route('/hello', methods=['GET'])
def hello():
    return 'Hello, World!'


#Spelling check
from textblob import TextBlob
def spell_check(text):
    textBlb = TextBlob(text)
    return textBlb.correct().string

@app.route('/spell', methods=['POST'])
def spell_correction():
    return spell_check(request.get_json()['text'])

# Define default endpoint
@app.route('/')
def default():
    return jsonify({
        'message': 'Welcome to the Sentiment Analysis API!',
        'endpoints': {
            '/help': 'Provides information about using the API',
            '/predict_all': 'Predicts sentiment of given text for all models',
            '/predict/{model_index}': 'Predicts sentiment of given text for specific model, default is 4',
        },
        'model_names': {
            '0': 'simple_ann_model_twit',
            '1': 'simple_ann_model_imdb',
            '2': 'cnn_model_twit',
            '3': 'cnn_model_imdb',
            '4': 'bilstm_model_twit',
            '5': 'bilstm_model_imdb'
        }
    })

# Define help endpoint
@app.route('/help')
def help():
    return jsonify({
        'message': 'To predict sentiment of text, send a POST request to /predict with JSON data',
        'json_data': {
            'text': 'Text to analyze (optional, defaults to "I am happy" if not provided)'
        },
        'example': {
            'endpoint': '/predict',
            'JSON data': {
                'text': 'This movie was terrible!'
            }
        },
        'model_names': {
            '0': 'simple_ann_model_twit',
            '1': 'simple_ann_model_imdb',
            '2': 'cnn_model_twit',
            '3': 'cnn_model_imdb',
            '4': 'bilstm_model_twit',
            '5': 'bilstm_model_imdb'
        }
    })

@app.route('/developer')
def developer_info():
    return "This API is developed by Gourav Chouhan and Mishthi Singhal."




if __name__ == '__main__':
    app.run(debug=True)



