import axios from 'axios'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { listCategory } from '../api/Category'
import { getProducts, seachFilters } from '../api/Product'
import _ from 'lodash'

const ecomStore = (set, get) => ({
    user: null,
    token: null,
    categories: [],
    products: [],
    carts: [],
    logOut: () => {
        set({
            user: null,
            token: null,
            categories: [],
            products: [],
            carts: [],
        })
    },
    actionUpdateQuantity: (productId, newCount) => {
        //Todo : set new count from product id
        set((state) => ({
            carts: state.carts.map((item) =>
                item.id === productId
                    ? { ...item, count: Math.max(1, newCount) }
                    : item
            )
        }))
    },
    actionRemoveCart: (productId) => {
        console.log('remove cart', productId)
        set((state) => ({
            carts: state.carts.filter((item) =>
                item.id !== productId

            )
        }))
    },
    actionAddToCart: (card) => {
        const carts = get().carts
        const updateCart = [...carts, { ...card, count: 1, roi: 'Like' }]
        const uniqe = _.unionWith(updateCart, _.isEqual)

        set({
            carts: uniqe
        })
    },
    getTotalPrice: () => {
        // Todo : reduce need call back function and start value(default value)
        return get().carts.reduce((totalPrice, item) => {
            return totalPrice + item.price * item.count
        }, 0)
    },
    actionLogin: async (form) => {
        const res = await axios.post('https://web-ecom-api.vercel.app/api/login', form)
        set({
            user: res.data.Payload,
            token: res.data.token
        })
        return res
    },
    //Todo : Get category list
    getCategory: async () => {
        try {
            const res = await listCategory()
            set({
                categories: res.data
            })
        } catch (err) {
            console.log(err)
        }
    },
    //Todo : Get product list
    getProduct: async (count) => {
        try {
            const res = await getProducts(count)
            set({
                products: res.data
            })
        } catch (err) {
            console.log(err)
        }
    },
    seachFilter: async (target) => {
        try {
            const res = await seachFilters(target)
            set({
                products: res.data
            })
        } catch (err) {
            console.log(err)
        }
    },
    clearCart: () => set({ carts: [] }),
})



const usePersist = {
    name: 'ecom-store',
    storage: createJSONStorage(() => localStorage)
}

const useEcomStore = create(persist(ecomStore, usePersist))

export default useEcomStore
