# MNIST Classification Service

1. 😒 without Docker

#### Prerequirements

- npm
- anaconda(or virtualenv)

#### Stacks

- PyTorch
- Flask
- React
- Docker

#### Git clone

```bash
git clone https://github.com/Ssuwani/mnist-classification-service.git
```

#### Anaconda env(Optional)

```bash
conda create -n mnist-cls python=3.7 -y
conda activate mnist-cls
```

## Quick Start

```bash
bash no_docker.sh
```
## Manual

**1. Installation**

```bash
pip install -r train/requirements.txt
pip install -r flask-app/requirements.txt
```

**2. Train Model**

```bash
python train/train.py --epochs 1 --save-model --save-model-path mnist.pt
```

**3. Run Flask App**

run on localhost:5000

```bash
python flask-app/app.py --model_path mnist.pt
```

**4. Run React App(open another terminal)**

run on localhost:3000

```bash
cd web-app/
npm i
npm start
```



**Demo**

![demo image](./images/demo.png)



2. 👍 with Docker

```bash
docker volume create vol

docker run -v vol:/app ssuwani/mnist_train --epochs 1 --save-model --save-model-path /app/mnist.pt

docker run -v vol:/app -p 5000:5000 ssuwani/mnist_app --model_path /app/mnist.pt

docker run -p 8300:80 ssuwani/mnist_web-app
```

