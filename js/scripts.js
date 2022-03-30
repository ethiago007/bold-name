function errorCheck(sentence) {
  return (sentence.trim().length === 0);
}

function errorCheck2(word, passage) {
  return ((passage.trim().length === 0) || (word.trim().length === 0));
}


function filterSentence(sentence) {
  sentence = sentence.toLowerCase();
  sentence = sentence.replace(/[^a-z0-9]+/g, "");
  return sentence;
}

function encodeSentence(sentence) {
  sentence = filterSentence(sentence);
  if (errorCheck(sentence)) {
    return ""
  } else {
    let square = [];
    let squareSides = Math.ceil(Math.sqrt(sentence.length));
    for (let i = 0; i < squareSides; i++) {
      square.push([]);
    }
    let sentenceArray = sentence.split("");
    let index = 0;
    sentenceArray.forEach(function (sentence) {
      square[index].push(sentence);
      index++;
      if (index === squareSides) {
        index = 0;
      }
    });
    let results = ""
    square.forEach(function (column) {
      results += column.join("");
    });
    let splitResults = "";
    for (let i = 0; i < results.length; i += 5) {
      splitResults += results.slice(i, i + 5) + " ";
    }
    return splitResults;
  }
}

function maskOffensiveWord(passage) {
  passage = passage.toLowerCase();
  let offensiveArray = ["biffaroni", "loopdaloop", "zoinks", "muppeteer"];
  let retArray = [];
  let textArray = passage.split(" ");
  textArray.forEach(function (element) {
    offensiveArray.forEach(function (oElement) {
      if (element === oElement) {
        element = encodeSentence(element);
      }
    })
    retArray.push(element);
  });
  return retArray.join(' ');
}

function wordMatch(wordOne, wordTwo) {
  wordOne = filterSentence(wordOne)
  wordTwo = filterSentence(wordTwo)

  return wordOne.toLowerCase().includes(wordOne.toLowerCase()) && wordOne.toLowerCase() === wordTwo.toLowerCase();
}

function boldPassage(word, passage) {
  if (errorCheck2(word, passage)) {
    return "";
  }
  word = word.toLowerCase();
  passage = passage.toLowerCase();
  let offensiveArray = ["biffaroni", "loopdaloop", "zoinks", "muppeteer"];
  let htmlString = "<p>";
  let passageArray = passage.split(" ");
  passageArray.forEach(function (element, index) {
    if (wordMatch(element, word)) {
      htmlString = htmlString.concat("<b>" + element + "</b>");
    }
    else if (element.includes(word) && element !== word) {
      newElement = element.replace(word, "<b>" + word + "</b>");
      htmlString = htmlString.concat(newElement);
    }
    else {
      htmlString = htmlString.concat(element);
    }
    offensiveArray.forEach(function (off) {
      if (index !== (passageArray.length - 1 && passageArray.length - 1 !== off)) {
        htmlString = htmlString.concat(" ");
      }
    });
  });
  return htmlString + "</p>";
}
// $(document).ready(function () {
//   $("#output1").submit(function (event) {
//     event.preventDefault();
//     let sentence = $("#sentence").val();
//     let codedSentence = encodeSentence(sentence);
//     $("#result1").text(codedSentence);
//   });
// });

$(document).ready(function () {
  $("#output2").submit(function (event) {
    event.preventDefault();
    let sentence1 = $("#text-passage").val();
    let word = $("#input1").val();
    let boldedPassage = boldPassage(word, sentence1);
    let maskedBoldPassage = maskOffensiveWord(boldedPassage)
    $("#bolded-passage").html(maskedBoldPassage);
  });
});