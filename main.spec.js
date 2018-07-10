describe('Тесты Ооп', function () {

  it('Прототип объекта', function () {
    var people = {
        eye: true
      },
      man = {
        jumps: true
      },
      spy = jasmine.createSpy('spy');

    man.__proto__ = people;

    expect(man.eye).toBe(true);

    for (var key in man) {
      spy(key);
    }

    expect(spy.calls.count()).toBe(2);
    expect(spy).toHaveBeenCalledWith('eye');
    expect(spy).toHaveBeenCalledWith('jumps');

  });

  it('Object.hasOwnProperty(prop)', function () {
    var people = {
        eye: true
      },
      man = {
        jumps: true,
        __proto__: people
      };

    expect(man.hasOwnProperty('jumps')).toBe(true);
    expect(man.hasOwnProperty('eye')).toBe(false);

    for (var key in man) {
      if (!man.hasOwnProperty(key)) continue;
      expect(man[key]).toBe(true);
    }

  });

  it('Object.create(null)', function () {
    var man = {},
      data = Object.create(null);

    man.eye = true;
    man.age = 35;
    data.text = "Привет";

    expect(data.text).toBe('Привет');
    expect(data.toString).not.toBe(true);
  });

  it('Методы', function () {
    var prototype1 = {},
      object1 = Object.create(prototype1),
      direct;

    expect(Object.getPrototypeOf(object1) === prototype1).toBe(true);

    direct = Object.setPrototypeOf({url: true}, null);

    expect(direct.url).toBe(true);

    direct.text = 'Привет';
    direct.data = 123;

    delete direct.text;

    expect(direct.text).toBe(undefined);

  });

  it('Свойства new', function () {
    var animal = {
      eats: true
    };

    function Rabbit(name) {
      this.name = name;
      this.__proto__ = animal;
    }

    var rabbit = new Rabbit('Кроль');

    expect(rabbit.eats).toBe(true);
    expect(rabbit.name).toBe('Кроль');

  });

  it('Запись по ссылке из prototype', function () {

    var animal = {
      eats: true
    };

    function Rabbit(name) {
      this.name = name;
    }

    Rabbit.prototype = animal;

    var rabbit = new Rabbit("Кроль");

    expect(rabbit.eats).toBe(true);

  });

  it('Запись по ссылке из prototype', function () {
    function Rabbit() {
    };

    expect(Object.getOwnPropertyNames(Rabbit.prototype)).toEqual(['constructor']);
    expect(Rabbit.prototype.constructor == Rabbit).toBe(true);

  });

  it('Эмуляция Object.create', function () {
    function inherit(proto) {
      function F() {
      }

      F.prototype = proto;
      var object = new F;
      return object;
    };

    var animal = {
        eats: true
      },
      rabbit = inherit(animal),
      rabbitNew = Object.create(animal);

    expect(rabbit).toEqual(rabbitNew);

  });

  it('Object.prototype', function () {

    expect(typeof {}.__proto__.toString).toBe('function');

  });

  it('Object.prototype', function () {
    var obj = {};

    expect(typeof {}.__proto__.toString).toBe('function');
    expect(obj.toString == Object.prototype.toString).toBe(true);
    expect(obj.__proto__ == Object.prototype).toBe(true);
    expect(obj.__proto__.__proto__).toBe(null);

  });

  it('Object.prototype', function () {

    function showList() {
      return [].join.call(arguments, " - ");
    }

    expect(showList("Вася", "Паша", "Маша")).toBe('Вася - Паша - Маша');

  });

  it('Конструктор', function () {

    function Man(name) {
      this.name = name;
      this.speed = 0;
      this.run = function (speed) {
        this.speed += speed;
        return this.name + ' бежит, скорость ' + this.speed;
      };

      this.stop = function () {
        this.speed = 0;
        return this.name + ' стоит';
      };
    }

    var man = new Man('Дима');

    expect(man.name).toBe('Дима');
    expect(man.run(3)).toBe('Дима бежит, скорость 3');
    expect(man.stop(0)).toBe('Дима стоит');

  });

  it('Наследование классов', function () {
    function Animal(name) {
      this.name = name;
      this.speed = 0;
    }

    function Rabbit(name) {
      Animal.apply(this, arguments);
    }

    expect(Rabbit()).toEqual(Animal());

  });

  it('Проверка класса: "instanceof"', function () {
    function Man() {
    }

    var newMan = new Man();

    expect(newMan instanceof Man).toBe(true);

    var arr = [];

    expect(arr instanceof Array).toBe(true);
    expect(arr instanceof Object).toBe(true);

  });

  it('Примеси', function () {
    var sayHiMixin = {
      sayHi: function () {
        return "Привет " + this.name;
      },
      sayBye: function () {
        return "Пока " + this.name;
      }
    };

    function User(name) {
      this.name = name;
    }

    for (var key in sayHiMixin) User.prototype[key] = sayHiMixin[key];

    expect(new User("Вася").sayHi()).toBe('Привет Вася');

  });

});