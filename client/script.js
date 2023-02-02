const form = document.querySelector('form');
const feedbackContainer = document.querySelector('#feedback-container')
const questionContainer = document.querySelector('#question_container')
const arrow = document.querySelector('#arrow-right')
const submit = document.querySelector('#select-topic');
let topic;
let loadInterval;
const loaderBackground = document.querySelector('.background');

function showLoader(){
  loaderBackground.classList.remove("hide")
  loaderBackground.classList.add("show")
  
}
function hideLoader(){
  loaderBackground.classList.remove("show")
  loaderBackground.classList.add("hide")
  
}
hideLoader();



feedbackContainer.style.display = 'none';

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
  
function chatStripe(value, uniqueId){
  return(
    `
     <div class="message" id=${uniqueId}>${value}</div>
    `
  )
}

const handleSubmit = async(e)=>{
  e.preventDefault();
  feedbackContainer.innerHTML = " "
  const data = new FormData(form);

  const uniqueId = generateUniqueId();

  feedbackContainer.innerHTML += chatStripe(" ",uniqueId);

  const messageDiv = document.getElementById(uniqueId)
  feedbackContainer.style.display = 'block';
  loader(messageDiv); 

  const response = await fetch('http://localhost:3000',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        prompt: `I am a highly intelligent marking bot. If you provide a IGCSE question and a student's answer divided with a '/' , I will give a mark out of 8 to the answer. This is the IGCSE syllabus: 
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
        Q/A: Analyse the reasons why trade union membership has reduced in some countries. / When the income of the public increases, the purchasing power of the population will increase. More people will be able to purchase the luxury brand of perfume, regardless of the price change of perfume, resulting in an increase in demand, This is represented by a rightward shift in the demand cure from O, toPs. The demand cure was a low gradient as it is highly price elastic. As the demand increases, there will be an extension in supply as the firms will be willing to supply more go odd at nigher prices, as they have a higher incentive to do so. This is represented by a shift in market equilibrium from E, to Es, an increase in market and quanitity equilibrium from Q1 to Q2 and an increase in market price from P1 to P2.
        M: 6 Marks  
        Q/A: Discuss whether or not a reduction in income tax will end a recession. / Recession is negative economic growth for two or more consecutive quaarters. A reduction in income tax could end a recession for a few reasons: Firstly, it increases the incentive to work. This means aggregate supply will increase since the size of the labour force will increase. This will also mean aggregate demand increases since the real income of consumers is higher, causing a greater spending power. This increases economic growth. Secondly, it will ensure less people are below the poverty line (since incomes will be higher). This means spending power of consumers is higher and there will  be less risk of health problems since consumers live in good conditions. Not only does this reduce the burden on the healthcare industry, it increases productivity and size of the workforce which increases aggregate supply. Finally, if the tax is regressive or proportional, then money will be redistributed from people with higher incomes to people with lower incomes. This means income and wealth is distributed more equally, so a macroeconomic aim is achieved (which increases economic growth, preventing recession). On the other hand, it could not affect the recession, or even worsen it in some situations. For example, a reduction in income tax causes a reduction in tax revenue which means the government can invest less on sectors that will increase aggregate demand and spending on capital or advancements in technology could ensure economic growth. Secondly, if the reduction is too low, then there would likely be no significant change in total supply of labour since the reduction is so small that more people are not incentivized to work. Finally, if the tax is progressive, the result would be that people with lower incomes will just get poorer and people with higher incomes will get richer (since they spend a lower proportion of their income on taxes). It will lower worsen disparity of income. In conclusion, the reduction in income tax could rseult in stopping the effects of reduction. However, I think the government needs to consider the finer details, such as type of tax and amount of reduction, because otherwise, the results could have the opposite effect than intended. I believe, in theory, it should work in favour of the macroeconomic aims, but if it is not executed correctly, the results could be quite damaging.
        M: 8 Marks  
        Q/A: Analyse how firms can benefit from specialisation. / Workers are more productive since they become more skilled, which leads to the production process being more effecient, leading to the production of a greater amount of g/s which increases the profit of firms. Time is saved  in the production process. In addition, labour productivity is one of  the factors leading to economies of scales which leads to cost savings for the firm.
        M: 7 Marks  
        Q/A: Discuss whether firms benefit from specialisation / Yes.
        M: 0 Mark 
        Q/A: Discuss whether or not a firm should have growth as its main objective / No, firms main objective are usually to gain profit–if they focus on growth they may forgo their profits.
        M: 1 Mark
        Q/A: Discuss whether or not a country with high wage rates will have a high unemployment rate. / High wage rates could mean that workers are motivated to work harder which leads to greater productivity and thus greater demand for labour. Furthermore higher wages would mean that consumers have a higher purchasing power and thus aggregate demand for g/s rises, so demand for labour will also rise. 
        M: 4 Marks 
        Q/A: Discuss whether or not countries specialising benefits consumers. / Specialisation in the context of countries consist of focusing on a narrow range of goods and services, usually derived from their factor endowment. On the one hand, by specialising countries may be able to increase the number and range of output as they use their absolute advantage, hence the quality of life of consumers will increase. Furthermore, as they specialise countries may gain more expertise in a producing a certain good/service and produce higher quality ouput for consumers to purchase.
        M: 2 Marks
        
        Q/A: ${questionContainer.innerHTML} / ${data.get('prompt')}
        M:`
    })
    
  })
  
  

  

  clearInterval(loadInterval);
  messageDiv.innerHTML = " "

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim() 

    typeText(messageDiv, parsedData)
  } else {
      const err = await response.text()

      messageDiv.innerHTML = "Something went wrong"
      alert(err)
  }
}

function findTopic(){
  let selectedOption = submit.options[submit.selectedIndex];
  const selectedValue = selectedOption.value;
  if(selectedValue == 1)(
    topic = "The Basic Economic Problem"
  )
  else if(selectedValue == 2)(
    topic = "The Allocation of Resources"
  )
  else if(selectedValue == 3)(
    topic = "The Allocation of Resources"
  )
  else if(selectedValue == 4)(
    topic = " Microeconomic decision makers (employees, trade unions)"
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

  return topic;
}

const newQuestion = async(e)=>{
  e.preventDefault();
  form.reset();
  showLoader();
  feedbackContainer.style.display = 'none';
  feedbackContainer.innerHTML=''

  let chosen_topic = findTopic()
  console.log(chosen_topic)

  const responseq = await fetch('http://localhost:3000',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: `Can you give me one IGCSE economics question about ${chosen_topic}? Here is the IGCSE Economics syllabus :
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
      Topic: "The Government and the Macroeconomy"
      Questions: Discuss whether an increase in taxes will cause deflation [8] 
      Discuss whether or not increasing government spending will enable a government to achieve its aims for the economy [8]
      Discuss whether or not a reduction in taxes is beneficial for an economy [8]
      Topic: "The Government and the Macroeconomy"
      Questions: Discuss whether a cut in the rate of interest would end deflation [8], 
      Discuss whether or not a fall in interest rates will benefit an economy [8], 
      Discuss whether or not a central bank should raise the rate of interest [8]
      Topic: "The Government and the Macroeconomy"
      Questions: Discuss whether supply-side policy measures will reduce inflation [8]
      Discuss whether or not infrastructure projects will benefit an economy [8] 
      Discuss whether or not an economy would benefit from less government regulation [8]
      Topic: The Government and the Macroeconomy
      Questions: Discuss whether a government should increase tax rates [8] 
      Discuss whether a government should spend more than it raises in taxation [8] 
      Discuss whether or not a cut in government spending on education would reduce the gap between government spending and tax revenue [8]
      Topic: ${chosen_topic}
      Questions:`
    })
  })

  clearInterval(loadInterval);

  if (responseq.ok) {
    const data = await responseq.json();
    const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 
    const realData = parsedData.split(']')[0] + ']'
    hideLoader();
    questionContainer.innerHTML = realData

  } else {
      const err = await responseq.text()
      hideLoader();
      questionContainer.innerHTML = "Something went wrong"
      alert(err)
  }
}





form.addEventListener('submit', handleSubmit);
// form.addEventListener('keyup',(e)=>{
//   if(e.keyCode === 13){
//     handleSubmit(e);
//   }
// })
arrow.addEventListener('click',newQuestion);






