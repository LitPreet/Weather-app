inputPart = document.querySelector(".input-part");
infoTxt = inputPart.querySelector(".info-txt");
inputField = inputPart.querySelector("input");
locationBtn = document.querySelector(".get");
const container = document.querySelector(".container") 
const wrapper = document.querySelector(".weather-part");
const searchBtn = document.querySelector(".search");
let api;

inputField.addEventListener("keyup",e=>{
    if(e.key == "Enter" && inputField.value != "")
    {
        requestApi(inputField.value);
    }
});
searchBtn.addEventListener("click",()=>{
    if(inputField.value != "")
    {
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click",()=>
{
    console.log("hii")
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }
    else{
        alert("Your browser does not support geolocation api")
    }
})
function onSuccess(position)
{
    const {latitude,longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=191fba8fc571be775d59f25a09bc39f2`;
    fetchData();
}

function onError(error)
{
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}
function requestApi(city)
{
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=191fba8fc571be775d59f25a09bc39f2`;
    fetchData();
}
function fetchData()
{
    infoTxt.innerText = "weather details fetched...."
    infoTxt.classList.add("pending");
    fetch(api)
    .then((resp)=>resp.json())
    .then(result =>weatherDetails(result));
}
function weatherDetails(info)
{
    infoTxt.classList.replace("pending","error")
    if(info.cod == "404")
    {
        infoTxt.innerText = `${inputField.value} isn't a valid city name`
    }
    else{
        // lets get started to put property value from info object 
        const city = info.name;
        const country = info.sys.country;
        const{description,id}=info.weather[0];
        const{feels_like,humidity,temp}=info.main;

        if(id == 800)
        {
            container.style.backgroundImage = "url('./img/sunny.jpg')";
        }
        else if(id >=200 && id<=232)
        {
            container.style.backgroundImage = "url('./img/storm.jpg')";
        }
        else if(id >=600 && id<=622 || temp<=0)
        {
            container.style.backgroundImage = "url('./img/snow.jpg')";
        }
        else if(id >=701 && id<=781)
        {
            container.style.backgroundImage = "url('./img/haze.jpg')";
        }
        else if(id >=801 && id<=804)
        {
            container.style.backgroundImage = "url('./img/cloudy.jpg')";
        
        }
        else if((id >=300 && id<=321) || (id >= 500 && id <=531))
        {
            container.style.backgroundImage = "url('./img/rain2.jpg')";
        }

        wrapper.querySelector(".temp .numb").innerText= Math.floor(temp);
        wrapper.querySelector(".weather").innerText= description;
        wrapper.querySelector(".location span").innerText= `${city},${country}`;
        wrapper.querySelector(".temp .numb-2").innerText= Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText= `${humidity}%`;

        infoTxt.classList.remove("pending","error")
        
    }
    console.log(info)
}