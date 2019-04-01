from flask import Flask, request, Response, render_template, redirect, url_for
import time
import requests
import label_image
import os
import cv2 
import pickle as pkl
import sys

app = Flask(__name__)

@app.route('/model', methods=['POST'])
def image():
	i = request.files['fileData']
	i.save("./data/target.jpg")
	image = cv2.imread("./data/target.jpg")
	eye_cascade = cv2.CascadeClassifier('haarcascade_eye.xml')
	eye = eye_cascade.detectMultiScale(image)
	try:
		left_eye = image[eye[0][1] : eye[0][1]+ eye[0][3] , eye[0][0] : eye[0][0]+eye[0][2]]
		#cv2.imshow('eye', left_eye)
	except IndexError: return "Cannot classify"

	cv2.imwrite('./data/extracted.jpg', left_eye)
	label = label_image.predict('./data/extracted.jpg')

	return label


if __name__ == '__main__':
    app.run(debug=True, host = "0.0.0.0")