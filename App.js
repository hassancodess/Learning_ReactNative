import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  BackHandler,
  Alert,
} from 'react-native';
import Button from './components/Button';
import Home from './screens/Home';
import Question from './screens/Question';
import Results from './screens/Results';

const App = () => {
  const [screenNo, setScreenNo] = useState(1);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const questions = [
    {title: 'Capital of Pak?', options: ['Lahore', 'Islamabad', 'Karachi']},
    {
      title: 'Who is the first Governor General of Pakistan?',
      options: ['Muhammad Ali Jinnah', 'Liaquat Ali Khan', 'Ayub Khan'],
    },
    {
      title: 'In which year did Pakistan win the Cricket World Cup?',
      options: ['1975', '1987', '1992'],
    },
    {
      title: 'Where was General Pervez Musharraf born?',
      options: ['Lahore', 'Delhi', 'Karachi'],
    },
    {
      title: 'Which is the national language of Pakistan?',
      options: ['Hindi', 'Bengali', 'Urdu'],
    },
  ];
  const correctAnswers = [2, 1, 3, 2, 3];

  const startQuiz = () => {
    console.log('Quiz Started');
    setScreenNo(2);
  };

  // on next Question
  const nextQuestion = () => {
    if (questionNumber < 4) {
      setQuestionNumber(prev => prev + 1);
      console.log(questionNumber);
    } else {
      console.log('User Answers: ', userAnswers);
      console.log('Skipped Answers: ', skipped);
      setScreenNo(3);
    }
  };

  const submitUserAnswer = answer => {
    setUserAnswers(prev => [...prev, answer]);
    nextQuestion();
  };

  const submitSkipQuestion = () => {
    setSkipped(prev => prev + 1);
    setUserAnswers(prev => [...prev, -1]);
    nextQuestion();
  };
  // Navigation betweeen Screens
  let screen;
  if (screenNo === 1) {
    screen = <Home startQuiz={startQuiz} />;
  } else if (screenNo == 2) {
    screen = (
      <Question
        question={questions[questionNumber]}
        questionAnswer={correctAnswers[questionNumber]}
        submitSkipQuestion={submitSkipQuestion}
        submitUserAnswer={submitUserAnswer}
      />
    );
  } else {
    // Calculate Correct Answers
    let totalCorrect = 0;
    let totalWrong = 0;
    let totalSkipped = 0;
    for (let i = 0; i < userAnswers.length; i++) {
      console.log(typeof userAnswers[i], typeof correctAnswers[i]);
      if (userAnswers[i] == correctAnswers[i]) {
        totalCorrect++;
      } else if (userAnswers[i] == -1) {
        totalSkipped++;
      } else {
        totalWrong++;
      }
    }

    screen = (
      <Results
        total={questions.length}
        correct={totalCorrect}
        skipped={totalSkipped}
        wrong={totalWrong}
      />
    );
  }
  return <View style={styles.container}>{screen}</View>;
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B3FFAE',
  },
});
