import pyttsx3

engine = pyttsx3.init()
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[33].id)
engine.setProperty('rate', 150)
#engine.say("Hello, how are you?")
engine.runAndWait()

def speak(str):
    engine.say(str)
    engine.runAndWait()