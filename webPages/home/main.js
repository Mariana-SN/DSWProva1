export default () => {
  const content = document.createElement("section");
  content.classList.add('content');

  content.innerHTML = `    <div id="homeContent">
  <Label for="fieldString">String Atual:</Label>
  <input class="fieldString" name="fieldString" id="fieldString" type="text" readonly value="${localStorage.getItem('stringHash')}">
</div>`;

  return content;
}