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
from bs4 import BeautifulSoup


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

# stop_words = stopwords.words('english')
stop_words = set(stopwords.words('english'))
stop_words.discard('not')

def remove_stopwords(text):
    tokens = text.split()
    filtered_tokens = [token for token in tokens if token not in stop_words]
    return " ".join(filtered_tokens)

def lemmatize_text(text):
    lemmatizer = WordNetLemmatizer()
    tokens = nltk.word_tokenize(text)
    return " ".join([lemmatizer.lemmatize(token) for token in tokens])

def handle_negation(text):
    window_size=3
    negation_terms = ['not', 'no', 'never', 'nobody', 'nothing', 'nowhere', 'hardly', 'scarcely', 'barely']
    # create a regex pattern to match any of the negation terms
    negation_pattern = re.compile(r'\b(' + '|'.join(negation_terms) + r')\b(?:\w+){0,' + str(window_size) + r'}(\W|$)')
    
    # split text into sentences
    sentences = re.split('\.\s+', text)
    output_sentences = []
    
    for sentence in sentences:
        # add prefix to words following a negation term
        output_sentence = re.sub(negation_pattern, r'\1_NEG ', sentence)
        output_sentences.append(output_sentence)
    
    # join sentences back together
    output_text = '. '.join(output_sentences)
    return output_text
#-----------------------------------



# Load the five pre-trained models and store them in a list
models = [
    tf.keras.models.load_model('./models/bilstmModel.h5'),  # Index 0
    tf.keras.models.load_model('./models/cnnModel.h5'),  # Index 1
    tf.keras.models.load_model('./models/hybridModel.h5'),         # Index 2
    tf.keras.models.load_model('./models/lstmModel.h5'),         # Index 3
    tf.keras.models.load_model('./models/snnModel.h5'),      # Index 4
]

# Corresponding model names for each index in the 'models' list
model_names = [
    'BILSTM Model',   # Index 0
    'CNN Model',   # Index 1
    'Hybrid Model',          # Index 2
    'LSTM Model',          # Index 3
    'SNN Model',       # Index 4
]



app = Flask(__name__)


    
# Predict all route
@app.route('/predict_sentiment', methods=['POST'])
@cross_origin()
def prediction_all():
    data = request.get_json()
    text = data.get('text', None)
    if text is None:
        return jsonify({'error': 'No text provided'})
    text = lowercase_text(text)
    text = clean_text(text)
    text = remove_non_alpha(text)
    text = remove_extra_spaces(text)
    text = remove_stopwords(text)
    text = lemmatize_text(text)
    text = handle_negation(text)
    # print("text",text)
    unseen_processed = [text]
    unseen_tokenized = tokenizer.texts_to_sequences([text])
    unseen_padded = pad_sequences(unseen_tokenized, padding='post', maxlen=100)
    
    overall_prediction = 0
    results = []

    for i in range(len(models)):
        model_name = model_names[i]
        model = models[i]

        prediction = model.predict(unseen_padded)[0][0]
        print(prediction)
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


if __name__ == '__main__':
    app.run(debug=True)



