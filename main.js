(function () {
  const loadDataButtonElement = document.getElementById('loadData'),
    dataContainerElement = document.getElementById('dataContainer');

  loadDataButtonElement.addEventListener('click', () => {
    // improve code here
    loadData('users.json', allUsers);

    function allUsers(result) {
      usersLength = result.length;
      for (var key in result) {
        if((dataContainerElement.children.length + 1)  > result.length) {
          return false;
        }
        const dataBlockElement = createUserDataBlockElement(result[key]);
        dataContainerElement.appendChild(dataBlockElement);
      }
    }

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