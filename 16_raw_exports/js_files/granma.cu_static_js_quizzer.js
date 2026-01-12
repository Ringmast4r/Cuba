var questionTemplate=_.template(" \
	<div class='card question'><span class='question'><%= question %></span> \
      <ul class='options'> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='0' id='q<%= index %>o1'> \
          <label for='q<%= index %>o1'><%= a %></label> \
        </li> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='1' id='q<%= index %>o2'> \
          <label for='q<%= index %>o2'><%= b %></label> \
        </li> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='2' id='q<%= index %>o3'> \
          <label for='q<%= index %>o3'><%= c %></label> \
        </li> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='3' id='q<%= index %>o4'> \
          <label for='q<%= index %>o4'><%= d %></label> \
        </li> \
      </ul> \
    </div> \
    ");var points,pointsPerQuestion,currentQuestion,questionTimer,timeForQuestion=15,timeLeftForQuestion;$(function(){$('button.start').click(start);$('.play_again button').click(restart);function restart(){points=0;pointsPerQuestion=10;currentQuestion=0;timeLeftForQuestion=timeForQuestion;$('.finish.card').hide();$('div.start').show();$('.times_up').hide();generateCards();updateTime();updatePoints()}
function start(){$('div.start').fadeOut(200,function(){moveToNextQuestion()})}
function generateCards(){$('.questions').html('');for(var i=0;i<questions.length;i++){var q=questions[i];var html=questionTemplate({question:q[0],index:i,a:q[1],b:q[2],c:q[3],d:q[4]});$('.questions').append(html)};$('.question.card input').change(optionSelected)}
function moveToNextQuestion(){currentQuestion+=1;if(currentQuestion>1){$('.question.card:nth-child('+(currentQuestion-1)+')').hide()}
showQuestionCardAtIndex(currentQuestion);setupQuestionTimer()}
function setupQuestionTimer(){if(currentQuestion>1){clearTimeout(questionTimer)}
timeLeftForQuestion=timeForQuestion;questionTimer=setTimeout(countdownTick,1000)}
function showQuestionCardAtIndex(index){var $card=$('.question.card:nth-child('+index+')').show()}
function countdownTick(){timeLeftForQuestion-=1;updateTime();if(timeLeftForQuestion==0){return finish()}
questionTimer=setTimeout(countdownTick,1000)}
function updateTime(){$('.countdown .time_left').html(timeLeftForQuestion+'s')}
function updatePoints(){$('.points span.points').html(points+' puntos de '+total*10)}
function optionSelected(){var selected=parseInt(this.value);var correct=questions[currentQuestion-1][5];if(selected==correct){points+=pointsPerQuestion;updatePoints();correctAnimation()}else{wrongAnimation()}
if(currentQuestion==questions.length){clearTimeout(questionTimer);return finish()}
moveToNextQuestion()}
function correctAnimation(){animatePoints('right')}
function wrongAnimation(){animatePoints('wrong')}
function animatePoints(cls){$('.points').addClass('animate '+cls);setTimeout(function(){$('.points').removeClass('animate '+cls)},500)}
function finish(){if(timeLeftForQuestion==0){$('.times_up').show()}
$('p.final_points').html(points+' puntos de '+total*10);$('.question.card:visible').hide();$('.finish.card').show()}
restart()})