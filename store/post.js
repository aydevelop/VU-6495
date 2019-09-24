import { resolve } from "uri-js"
import { create } from "domain";

const posts = [
    {title: 'Post 1', date: new Date(), views: 22, comments: [1, 2], _id: 'id1'},
    {title: 'Post 2', date: new Date(), views: 22, comments: [1, 2], _id: 'id2'}
  ]

export const actions = {
    async fetchAdmin(){
         try {
             return await this.$axios.$get('posts');
         }catch(e){
             commit('setError', e, {root: true})
             throw e;
         }
    },

    async remove({}, id){
        try {
            return await this.$axios.$delete('posts/'+id);
        }catch(e){
            commit('setError', e, {root: true})
            throw e;
        }
    },

    async fetchAdminById({}, id){
        try {
            return await this.$axios.$get('posts/'+id);
        }catch(e){
            commit('setError', e, {root: true})
            throw e;
        }
    },

    async fetch({commit}, id){
        try {
            return await this.$axios.$get('showposts');
        }catch(e){
            commit('setError', e, {root: true})
            throw e;
        }
    },

    async fetchById({commit}, id){

        try {
            return await this.$axios.$get('showpostbyid/' + id);
        }catch(e){
            commit('setError', e, {root: true})
            throw e;
        }
    },

    async update({}, {id, text}){

        try {

            await this.$axios.$put('posts/'+id, { text: text });
        }catch(e){
            commit('setError', e, {root: true})
            throw e;
        }
    },

    async create({commit}, {title, text, image}){
        const form_d = new FormData();
        form_d.append('title', title);
        form_d.append('text', text);
        form_d.append('image', image, image.name);
        
        try {
            await this.$axios.$post('posts', form_d);
        }catch(e){
            commit('setError', e, {root: true})
            throw e;
        }

    }
}