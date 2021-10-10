# Train MNIST
pip install -r train/requirements.txt
python train/train.py --epochs 1 --save-model --save-model-path mnist.pt

# Flask App 
pip install -r flask-app/requirements.txt
python flask-app/app.py --model_path mnist.pt &

# React App
cd web-app/
npm i
npm start
