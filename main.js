(function () {
  const loadDataButtonElement = document.getElementById('loadData'),
    dataContainerElement = document.getElementById('dataContainer');

  loadDataButtonElement.addEventListener('click', () => {
    // improve code here

    if(dataContainerElement.children.length  > 0) {
      return
    }
    loadData('users.json', allUsers);

    function allUsers(result) {

      for (var key in result) {
        const dataBlockElement = createUserDataBlockElement(result[key]);
        dataContainerElement.appendChild(dataBlockElement);
      }
    }
    console.log(dataContainerElement.children.length);
  });

  function loadData(url, callback) {
    const request = new XMLHttpRequest();

    request.open('get', url);
    request.addEventListener('load', () => {
      const result = JSON.parse(request.response);

    callback(result);
  });

    request.send();
  }

  function createUserDataBlockElement(user) {
    const result = document.createElement('div'),
      nameElement = document.createElement('span'),
      ageElement = document.createElement('span');

    nameElement.textContent = user.name;
    ageElement.textContent = user.age;

    result.appendChild(nameElement);
    result.appendChild(ageElement);

    return result;
  }

})();