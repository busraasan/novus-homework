if (document.location.search.includes('dark-theme=true')) {
    document.body.classList.add('dark-theme');
  }
  
let cursor = 0;
const RANGE = 5;
const LIMIT = 16_000;

window.onload = function(){ document.getElementById("loading").style.display = "none" }

function showLoader()
{
  document.getElementById("loading").style.display = "block";
}

function hideLoader()
{
  document.getElementById("loading").style.display = "none";
}

const translateText = async (text) => {
  showLoader();
  const inferResponse = await fetch(`infer_gpt2?input=${text}`);
  const inferJson = await inferResponse.json();
  hideLoader();
  return inferJson.output;
};
    
const textGenForm = document.querySelector('.text-gen-form');
  
textGenForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const textGenInput = document.getElementById('text-gen-input');
  const textGenParagraph = document.querySelector('.text-gen-output');

  try {
    textGenParagraph.textContent = await translateText(textGenInput.value);
  } catch (err) {
    console.error(err);
  }
});
