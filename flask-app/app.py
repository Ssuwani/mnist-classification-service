import torch
from flask import Flask, request
from flask_cors import CORS
from model import Net
import argparse
from torchvision import transforms
from PIL import Image
# from test import preprocess

app = Flask(__name__)
CORS(app)

def load_model(model_path):
    model = Net()
    model.load_state_dict(torch.load(model_path))
    return model


def preprocessing(data):
    """Preprocessing Function

    Input:
        Flask Class 'FileStorage'
    Output:
        Image
    """
    transform = transforms.Compose(
        [transforms.ToTensor(), transforms.Normalize((0.1307,), (0.3081,))]
    )
    image = Image.open(data)
    image = transform(image)
    return image


def predict(x):
    """Predict Function

    Input:
        Image
    Output:
        value
    """

    x = x.unsqueeze(0)
    output = model(x)
    pred = output.argmax(dim=1, keepdim=True)

    return pred.item()


@app.route("/")
def root_route():
    return {"error": "use POST /prediction instead of root route"}


@app.route("/prediction", methods=["POST"])
def prediction_route():
    """Prediction Router

    Input:
        formData from Flask
    Output:
        Json: ("class_name": value)
        example:
             {"class_name": 1}
    """

    data = request.files.get("file")

    image = preprocessing(data)
    result = predict(image)

    print("result: ", result)
    return {"class_name": result}


def main():
    parser = argparse.ArgumentParser(description="PyTorch MNIST Test Example")

    parser.add_argument(
        "--model_path",
        type=str,
        help="input model path",
    )
    args = parser.parse_args()
    global model
    model = load_model(args.model_path)

    app.run(debug=True, host='0.0.0.0')


if __name__ == "__main__":
    main()
