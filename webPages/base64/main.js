export default () => {
    const content = document.createElement("section");

    content.classList.add('content');

    var stringHash = localStorage.getItem('stringHash');
    var encodedBase64 = "";
    var UpperCase = String(stringHash).toUpperCase();
    var LowerCase = String(stringHash).toLowerCase();
    var ProperCase = toProperCase(stringHash);
    var CapitalCase = toCapitalCase(stringHash);

    function toCapitalCase(string) {
        return String(string).charAt(0).toUpperCase() + String(string).slice(1);
    }

    function toProperCase(string) {
        let stringSplit = String(string).split(' ');
        let ProperCase = "";

        for (let index = 0; index < stringSplit.length; index++) {
            let stringProper = String(stringSplit[index]).charAt(0).toUpperCase() + String(stringSplit[index]).slice(1);
            ProperCase += stringProper + " ";
        }

        return ProperCase;
    }



    content.innerHTML = `
    <div>
    <Label for="fieldString">Frase atual:</Label>
    <input class="fieldString" name="fieldString" id="fieldStringHash" type="text" readonly value="${stringHash}">
    </div><br>

  <div>
  <Label for="fieldStringBase64">Base64 Encode:</Label><br>
  <textarea class ="fieldString" name="fieldString" id="fieldStringEncoded" readonly value="${encodedBase64}"></textarea>
      <div id="encodeButtons">
          <input class="btn encodeButton" name="encodeButton" id="encodeButton" type="button" value="Codificar">
          <input class="btn decodeButton" name="decodeButton" id="decodeButton" type="button" value="Decodificar">
      </div>
  </div><br>

  <div>
  <button class="btn btnCase" id="caseTypeUC" value="UC">Upper Case</button>
  <button class="btn btnCase" id="caseTypeLC" value="LC">Lower Case</button>
  <button class="btn btnCase" id="caseTypePC" value="PC">Proper Case</button>
  <button class="btn btnCase" id="caseTypeCC" value="CC">Capital Case</button>
  </div><br>

  <Label for="fieldStringConvertedType">Resultado do tipo de Conversão:</Label><br>
  <textarea id="typeResult" readonly></textarea>
  `;

    var textAreaResult = content.querySelector('#typeResult');
    const caseType = content.querySelectorAll('[id*=caseType]');
    var isEncoded = false;


    for (let i = 0; i < caseType.length; i++) {
        caseType[i].addEventListener('click', function (event) {
            caseTypeChosen(caseType[i].value);
        });
    }

     function attResultArea(stringResult) {
        textAreaResult.textContent = stringResult;
    }

    function caseTypeChosen(chosenType) {
        if(!isEncoded){
        switch (chosenType) {
            case 'UC': {
                attResultArea(UpperCase);
                break;
            }
            case 'LC': {
                attResultArea(LowerCase);
                break;
            }
            case 'PC': {
                attResultArea(ProperCase);
                break;
            }
            case 'CC': {
                attResultArea(CapitalCase);
                break;
            }
        }
    }
    else{
        switch (chosenType) {
            case 'UC': {
                attResultArea(encodedBase64.toUpperCase());
                break;
            }
            case 'LC': {
                attResultArea(encodedBase64.toLowerCase());
                break;
            }
            case 'PC': {
                attResultArea(toCapitalCase(encodedBase64));
                break;
            }
            case 'CC': {
                attResultArea(toCapitalCase(encodedBase64));
                break;
            }
        }
    }
    }

    const encodeButton = content.querySelector('#encodeButton');
    const decodeButton = content.querySelector('#decodeButton');

    decodeButton.disabled = true;

    encodeButton.addEventListener('click', () => {
        isEncoded = true;
        encodedBase64 = btoa(stringHash);
        content.querySelector('#fieldStringEncoded').value = encodedBase64;
        decodeButton.disabled = false;
    });

    decodeButton.addEventListener('click', () => {
        isEncoded = false;
        encodedBase64 = atob(encodedBase64);
        content.querySelector('#fieldStringEncoded').value = encodedBase64;
        decodeButton.disabled = true;
    });

    return content;
}