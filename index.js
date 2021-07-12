  
var synth= window.speechSynthesis;


var inputForm= document.querySelector('form');
var inputTxt= document.querySelector('.txt');
var voiceSelect= document.querySelector('select');


var pitch=document.querySelector('#pitch');
var pitchValue= document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue= document.querySelector('.rate-value');

var resume = document.querySelector("#play");
var pause = document.querySelector("#pause");

var voices=[];


function populateVoiceList(){
    voices=synth.getVoices();
    console.log(voices);
    for(let i=0;i<voices.length;i++){
        var option= document.createElement('option');
        option.textContent= voices[i].name + '(' + voices[i].lang + ')';

        if(voices[i].default){
            option.textContent + '--DEFAULT';
        }

        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name',voices[i].name);
        voiceSelect.appendChild(option);

    }

}

populateVoiceList();

if(synth.onvoiceschanged!== undefined){
    speechSynthesis.onvoiceschanged = populateVoiceList;
}


speak= ()=>{
    if(synth.speaking){
        console.error('Already Speaking...');
        return ;

    }
    if(inputTxt.value !== ''){
    
    var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
        //if speaking has ended
    utterThis.onend = e =>{
        console.log('Done speaking...');
    }
        //if error while speaking
    utterThis.onerror = e =>{
        console.log(e);
    }
        //choose the voice
    var selectedOption= voiceSelect.selectedOptions[0].getAttribute('data-name');
    voices.forEach(v=>
        {
            if(v.name===selectedOption)
            utterThis.voice=v;
        });
    
        //find pitch and rate
    utterThis.pitch= pitch.value;
    utterThis.rate= rate.value;

        //speak the text
    synth.speak(utterThis);
    console.log(utterThis);
    }
};

inputForm.addEventListener('submit', e=>{
    e.preventDefault();
    speak();
    inputTxt.blur();
}
)
pitch.oninput = function() {
    pitchValue.textContent = pitch.value;
  }
  
  rate.oninput = function() {
    rateValue.textContent = rate.value;
  }


