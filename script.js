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

function service(url) {
  return fetch(url)
    .then((res) => res.json())
}

function init() {


  Vue.component('newsearch', {

    template: `
    <input type="text" class="goods-search" v-model="search"  @click="$emit('input')"/>
                `
  });

  Vue.component('basket', {

    template: `
    <div class="fixed-area">
    <div class="basket-card">
        <div class="basket-card__header">
            <h1 class="basket-card__header__title">basket card</h1>
            <div class="basket-card__header__delete-icon" @click="$emit('close')"></div>
        </div>
        <div class="basket-card__content">content</div>
    </div>
</div>
    `
  });


  Vue.component('custom_button', {

    template: `
    <button class="cart-button" type="button" v-on: @click="$emit('click')">
    <slot></slot>
    </button>
    `
  });



  Vue.component('goods_item', {
    props: [
      'item'
    ],
    template: `
      <div class = "goods-item" >
                    <h3>{{ item.product_name }}</h3>
    <p>{{ item.price }}</p>
                    </div>
    `
  })





  const app = new Vue({
    el: '#root',
    data: {
      items: [],
      filteredItems: [],
      search: '',
      isVisibleCart: false
    },
    methods: {
      fetchGoods() {
        service(GET_GOODS_ITEMS).then((data) => {
          this.items = data;
          this.filteredItems = data;
        });
      },
      filterItems() {
        this.filteredItems = this.items.filter(({ product_name }) => {
          return product_name.match(new RegExp(this.search, 'gui'))
        })
      },

      setVisibleCard() {
        this.isVisibleCart = !this.isVisibleCart;
      }
    },
    computed: {
      calculatePrice() {
        return this.filteredItems.reduce((prev, { price }) => {
          return prev + price;
        }, 0)
      }
    },

    mounted() {
      this.fetchGoods();
    }
  })
}
window.onload = init










