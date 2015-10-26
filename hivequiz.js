'use strict';

function HiveQuizApp() {
    var version = 'v1.0';
    var questions = new Array();
    var counter = 0;

    function loadQuestions(csvname) {
        return $.get(csvname, function(data) {
            var lines = shuffle(data.split('\n'));
            var idx;
            for (idx=0; idx < lines.length; idx++) {
                if (lines[idx].length == 0) { continue };
                var item = lines[idx].split(',');
                addQuestion(item[0], item[1]);
            }
        }, 'text');
    }

    function addQuestion(img, name) {
        questions.push([img, name]);
    }

    function setQuestion(idx) {
        $('#image-display').empty();
        $('#image-display').prepend('<img src="'+questions[idx][0]+'" alt="plaatje"/>');
    }

    function setStatus(message) {
        $('#app>footer').text(message);
    }

    function readAnswer() {
        var answer = $('#answer-entry').val();
        if (answer) {
            if (verifyAnswer(answer)) {
                // if verify is true/correct: clear field and move to next Q
                $('#answer-entry').val('').focus();
                $('#answer-feedback').text('Goed zo! Op naar de volgende vraag');
                counter++;
                if (counter >= questions.length) {
                    alert('Klaar! Je hebt alles opgelost');
                    counter=0;
                    questions = new Array();
                    loadQuestions('res/hivequiz.txt').done(function() { setQuestion(0); });
                } else {
                    setQuestion(counter);
                }
            } else {
                // TODO: append Q at the end for retesting (unless last one)
                $('#answer-feedback').text('Ben je zeker? Heb je wel juist getypt?');
                $('#answer-entry').css({'color' : '#FF0000'});
            }
        }
    }

    function verifyAnswer(answer) {
        return ($('#answer-entry').val().toUpperCase() === questions[counter][1].toUpperCase());
    }

    // Shuffle function from http://bost.ocks.org/mike/shuffle/
    function shuffle(array) {
        var m = array.length, t, i;

        // While there remain elements to shuffle ...
        while (m) {
            // pick a remaining element, ...
            i = Math.floor(Math.random() * m--);
            // and swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }

    this.start = function() {
        $('#answer-entry').keypress(function(e) {
            if (e.which == 13) { // 'enter' key
                readAnswer();
                return false;
            } else {
                $('#answer-feedback').text('');
                $('#answer-entry').css({'color' : '#000000'});
            }
        })
        .focus();

        loadQuestions('res/hivequiz.txt').done(function() { setQuestion(0); });
        $('#app>header').append(' - ' + version);
        setStatus('ready');
    };
}

$(function() {
    window.app = new HiveQuizApp();
    window.app.start();
});
