import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');
const feedbackContainer = document.querySelector('feedback-container')
const questionContainer = document.querySelector('#question_container')
const arrow = document.querySelector('#arrow-right');
const submit = document.querySelector('#select-topic');
let topic;

let loadInterval;

function loader(element){
  element.textContent = '';

  loadInterval = setInterval(()=>{
    element.textContent += '.';

    if (element.textContent === '....'){
      element.textContent = '';
    }
  },300)
}

function typeText(element,text){
  let index = 0;
  
  let interval = setInterval(()=>{
    if(index < text.length){
      element.innerHTML += text.charAt(index);
      index ++;
    } else{
      clearInterval(interval);
    }
  }, 20)
}

function generateUniqueId(){
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}
  
function chatStripe(isAi, value, uniqueId){
  return(
    `
     <div class="message" id=${uniqueId}>${value}</div>
    `
  )
}

const handleSubmit = async(e)=>{
  e.preventDefault();

  const data = new FormData(form);

//   feedbackContainer.innerHTML += chatStripe(false,data.get('prompt'));

//   form.reset();

  const uniqueId = generateUniqueId();

  feedbackContainer.innerHTML += chatStripe(true," ",uniqueId);

//   chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId)

  loader(messageDiv); 

  const response = await fetch('http://localhost:3000',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        prompt: data.get('prompt')
    })
  })

  clearInterval(loadInterval);
  messageDiv.innerHTML = " "

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 

    typeText(messageDiv, parsedData)
  } else {
      const err = await response.text()

      messageDiv.innerHTML = "Something went wrong"
      alert(err)
  }
}

const newQuestion = async(e)=>{
  e.preventDefault();
  form.reset();
  feedbackContainer.innerHTML=''

  // const data = new FormData(form);

//   feedbackContainer.innerHTML += chatStripe(false,data.get('prompt'));

//   form.reset();

  // const uniqueId = generateUniqueId();

  // feedbackContainer.innerHTML += chatStripe(true," ",uniqueId);

//   chatContainer.scrollTop = chatContainer.scrollHeight;

  // const messageDiv = document.getElementById(uniqueId)

  // loader(messageDiv); 

  function findTopic(){
    let selectedOption = submit.options[submit.selectedIndex];
    let selectedValue = selectedOption.value;
    if(selectedValue == 1)(
      topic = "The Basic Economic Problem, such as production possibility curves and demand and supply"
    )
    else if(selectedValue == 2)(
      topic = "The Allocation of Resources, such as demand, supply and elasticity"
    )
    else if(selectedValue == 3)(
      topic = "The Allocation of Resources, such as market failure, externalities and monopolies"
    )
    else if(selectedValue == 4)(
      topic = " Microeconomic decision makers (employees, trade unions), such as trade unions, labour markets and minimum wages"
    )
    else if(selectedValue == 5)(
      topic = " Microeconomic decision makers (private firms)"
    )
    else if(selectedValue == 6)(
      topic = "The Government and the Macroeconomy"
    )
    else if(selectedValue == 7)(
      topic = "International Trade and Globalisation"
    )
    else if(selectedValue == 8)(
      topic = "Development Economics"
    )
  }
  



  const responseq = await fetch('http://localhost:3000',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        prompt: `Can you give me some IGCSE economics question about ${topic}? Here is the IGCSE Economics syllabus :
        1 The basic economic problem
        The first section of the syllabus introduces the fundamental ideas and concepts that underpin the study of
        economics including the basic economic problem, factors of production, opportunity cost and production
        possibility curves.
        2 The allocation of resources
        The fundamental principles of resource allocation are considered through the price mechanism in a market
        economy. The market forces of demand and supply, market equilibrium and disequilibrium, and elasticity form
        the core of this section.
        3 Microeconomic decision makers
        The microeconomy is an important area of study, and the approach to learning taken here is through the role of
        the major decision makers: banks, households, workers, trade unions and firms.
        4 Government and the macroeconomy
        Governments have different macroeconomic aims, and conflicts often arise between the choice of measures
        used to achieve them. Variables must be measured to consider the causes and consequences of change, and
        appropriate policies applied.
        5 Economic development
        As an economy develops there will be changes in population, living standards, poverty and income
        redistribution. Therefore, the effects of changes in the size and structure of population and of other influences
        on development in a variety of countries are explored.
        6 International trade and globalisation
        The importance of trade between countries and the growth of globalisation is explored. Principles such as
        specialisation, the role of free trade, the role of multinational companies, foreign exchange rates and balance of
        payments stability are considered.
        
        Here are some examples:
        Topic: fiscal policy
        Questions: Discuss whether an increase in taxes will cause deflation [8] 
        Discuss whether or not increasing government spending will enable a government to achieve its aims for the economy [8]
        Discuss whether or not a reduction in taxes is beneficial for an economy [8]
        Topic: monetary policy
        Questions: Discuss whether a cut in the rate of interest would end deflation [8], 
        Discuss whether or not a fall in interest rates will benefit an economy [8], 
        Discuss whether or not a central bank should raise the rate of interest [8]
        Topic: supply side policy
        Questions: Discuss whether supply-side policy measures will reduce inflation [8]
        Discuss whether or not infrastructure projects will benefit an economy [8] 
        Discuss whether or not an economy would benefit from less government regulation [8]
        Topic: the role of the government
        Questions: Discuss whether a government should increase tax rates [8] 
        Discuss whether a government should spend more than it raises in taxation [8] 
        Discuss whether or not a cut in government spending on education would reduce the gap between government spending and tax revenue [8]
        Topic: ${topic}
        Questions:`
        
    })
  })

  clearInterval(loadInterval);

  if (responseq.ok) {
    const data = await responseq.json();
    const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 

    questionContainer.innerHTML = parsedData

  } else {
      const err = await responseq.text()

      questionContainer.innerHTML = "Something went wrong"
      alert(err)
  }
}




form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup',(e)=>{
  if(e.keyCode === 13){
    handleSubmit(e);
  }
})

arrow.addEventListener('click',newQuestion);