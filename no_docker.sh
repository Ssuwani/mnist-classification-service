# Train MNIST
cd train
pip install -r requirements.txt
python train.py --epochs 1 --save-model --save-model-path ../mnist.pt

# Flask App 
cd ../flask-app
pip install -r requirements.txt
python app.py --model_path ../mnist.pt &

# React App
cd ../web-app
npm i
npm start

# Train MNIST
# cd train
# ls
# pip install -r requirements.txt
# python train.py --epochs 1 --save-model

# # Flask App 
# cd ../flask-app
# ls

# # React App
# cd ../web-app
# ls