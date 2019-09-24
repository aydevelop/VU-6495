export const actions = {
    async create({commit, dispatch}, data){
        try {
            const res = await this.$axios.$post('addcomment', data);
            return res;
        }catch(e){
            commit('setError', e, {root: true})
            throw e;
        }
    }
}