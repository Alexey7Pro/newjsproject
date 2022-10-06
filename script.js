const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const GET_GOODS_ITEMS = `${BASE_URL}
catalogData.json`
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}
getBasket.json`;

function service(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  xhr.onload = () => {
    if (xhr.readyState === 4) {
      callback(JSON.parse(xhr.response))
    }
  }
}

const app = new Vue({
  el: '#root',
  data: {
    goods: [],
    search: ''
  },
  mounted() {
    service(GET_GOODS_ITEMS, (data) => {
      this.goods = data;
    });
  },
  computed: {
    calculatePrice() {
      return this.goods.reduce((prev, { price }) => {
        return prev + price;
      }, 0)
    },
    filteredGoods() {
      return this.goods.filter((item) => {
        const regExp = new RegExp(this.search);
        return regExp.test(item.product_name)
      })
    }
  }
})
