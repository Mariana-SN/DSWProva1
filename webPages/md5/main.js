export default () => {
    const content = document.createElement("section");
    content.classList.add('content');

    var MD5Encoded = 'Não codificada'
    const stringHash = localStorage.getItem('stringHash');
    const UpperCase = String(stringHash).toUpperCase();
    const LowerCase = String(stringHash).toLowerCase();
    const ProperCase = toProperCase(stringHash);
    const CapitalCase = toCapitalCase(stringHash);

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
    <Label for="fieldStringMd5">MD5 Encode:</Label><br>
        <textarea class ="fieldString" name="fieldString" id="fieldStringEncoded" readonly value="${MD5Encoded}"></textarea><br>
        <input class="btn encodeButton" name="encodeButton" id="encodeButton" type="button" value="Codificar">
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
        if (!isEncoded) {
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
                    attResultArea (ProperCase);
                    break;
                }
                case 'CC': {
                    attResultArea(CapitalCase);
                    break;
                }
            }
        }
        else {
            switch (chosenType) {
                case 'UC': {
                    attResultArea(MD5Encoded.toUpperCase());
                    break;
                }
                case 'LC': {
                    attResultArea(MD5Encoded.toLowerCase());
                    break;
                }
                case 'PC': {
                    attResultArea(toCapitalCase(MD5Encoded));
                    break;
                }
                case 'CC': {
                    attResultArea(toCapitalCase(MD5Encoded));
                    break;
                }
            }
        }
    }

    const encodeButton = content.querySelector('#encodeButton');

    encodeButton.addEventListener('click', () => {
        MD5Encoded = md5(stringHash);
        isEncoded = true;
        content.querySelector('#fieldStringEncoded').value = MD5Encoded;
    });

    return content;
}