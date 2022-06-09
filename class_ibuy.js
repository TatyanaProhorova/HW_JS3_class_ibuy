
class Good {
    constructor (id, name, description, sizes, price, available) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.sizes = sizes;
    this.price = price;         
    this.available = available;     // 1 - товар доступен, 0 - 1 - товар недоступен
    }
    setAvailable() {
        if (this.available) { 
            this.available = 0;
        }
        this.available = 1;
        return this.available;
    } 
}

class GoodsList {               //класс для хранения каталога товаров со свойствами:    
    #goods;                   
    constructor (goodValues, filter) {    
        this.#goods = goodValues;
        this.filter = filter;
        // this.sortPrice = sortPrice; // true - сортировка по price доступна, false - нет
        // this.sortDir = sortDir;     // true - сортировка по возрастанию price, false - по убыванию 
        }    

    get list() { 
        let b = this.#goods.filter(item => item.available); 
        return (b.filter(item => this.filter.test(item.name))); 
    }

    print() {
        console.log(this.#goods);
    }
    
    add(instGood) {            // добавление товара в каталог
        return this.#goods.push(instGood);             
    }

    remove(id) {
        return this.#goods.filter(item => item.id !== id); 
    }
}

class BasketGood extends Good {
    constructor(instGood, amount) {
        super(instGood.id, instGood.name, instGood.description,
             instGood.sizes, instGood.price, instGood.available);
        this.amount = amount;
    } 
}

class Basket {                      //   массив объектов класса BasketGood
    constructor (arrBasketGood) {   // TODO   не будем помещать в корзину товаы с 0-м количеством
        this.goods = arrBasketGood = [basketGood_1, basketGood_2,]; //  basketGood_3];  // [basketGood_2];//    
    }

    get totalAmount() {  
        if (this.goods !== undefined) {    
            return this.goods.reduce((sum, current) => sum + current.amount, 0);
        }
        else {
            return 0;
        }              
    }

    get totalSum() {
        if (this.goods !== undefined) {   
            return this.goods.reduce((sum, current) => sum + current.price * current.amount, 0);
        }
        else {
            return 0;
        }     
    }
        
    add(good, amount) {  //Добавляет товар в корзину, если товар уже есть увеличивает количество //undefined
        if (this.goods === undefined) {
            this.goods = {id: good.id, name: good.name, description: good.description, 
                sizes: good.sizes, price: good.price, available: good.available,
                 amount: (good.amount + amount)}; 
            return this.goods;
        };

        let theBasketGood = this.goods.find(item => item.id === good.id);
        if (theBasketGood !== undefined) {            
            theBasketGood.amount += amount;
            return this.goods;
        } 
        else {
            let newBasketGood = new BasketGood(
                new Good(good.id, good.name, good.description, good.sizes, good.price, good.available),
                amount);            
            this.goods.push(newBasketGood)
            return this.goods;            
        }
    }

    remove(good, amount) {
        let theBasketGood = this.goods.find(item => item.id === good.id);   //  !== || ===  undefined
        if (theBasketGood) {                                                //  !== undefined
            let newAmount = theBasketGood.amount - amount;
            theBasketGood.amount -= amount;
            if (newAmount == 0) {    //  удаляем из массива
                return this.goods.filter(item => item.id !== good.id);
            }
            else if (newAmount > 0) {
                return this.goods;
            } 
            else {
                console.log(`V корзина ниже V Вы хотите удалить больше единиц товара, чем есть в корзине`); // вернуть корзину?
                return this.goods;
                }
        }    
        else {
            console.log(`V корзина ниже V Такого товара нет в корзине`); // вернуть корзину
            return this.goods;
        }    
    }   
        
    clear() {
        this.goods = [];
        return this.goods;
    }

    removeUnavailable() {
        return this.goods.filter(item => item.available !== 0);
    }
}

//                   (id,  name,  description, sizes,    price, availabl)
const good1 = new Good(1, `socks`, `black`, [23, 25, 27], 5050, 1);
const good2 = new Good(2, `shirts`, `red`, [46, 50], 15000,  1);
const good3 = new Good(3, `skirt`, `brown`, [46], 45000, 1);
const good4 = new Good(4, `boots`, `blue`, [36, 39], 115000, 1);
const good5 = new Good(5, `jeans`, `red`, [29, 32], 85000, 0);

const a = [
   good1, good3, good4, good5   
];

let listOfGoods = new GoodsList(a, /\w/g);
listOfGoods.print();                                          //1...3...4...5...
console.log(`listOfGoods`, listOfGoods.list);                 //1...2...3...4...

console.log(listOfGoods.remove(1));                           //3...4...5...
console.log(`listOfGoods`, listOfGoods.add(good2));           //5


let basketGood_1 = new BasketGood(good3, 4);                  // возможно добавление с 0-м колиеством
console.log(`basketGood_1`, basketGood_1); 
let basketGood_2 = new BasketGood(good2, 11);
let basketGood_3 = new BasketGood(good5, 1);      

let basket1 = new Basket(); 

console.log(`basket1`, basket1.add(basketGood_1, 117));  
console.log(`basket1`, basket1.remove(good5, 11));  //if id 6 или 5
console.log(`1__basket1_totalAmount`, basket1.totalAmount);
console.log(`1__basket1_totalSum`, basket1.totalSum);
console.log(`removeUnavailable`, basket1.removeUnavailable());