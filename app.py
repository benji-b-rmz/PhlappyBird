from flask import Flask, render_template


app = Flask(__name__)

@app.route('/')
def load_index():
    return render_template('index.html')


if __name__ == '__main__':
    # set debug to True to auto-update on file changes
    app.run(debug=True)
