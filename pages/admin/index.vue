<template>
    <div>
        <h1>Welcome to admin page</h1>
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script>
import {Bar} from 'vue-chartjs'

export default {
    layout: 'admin',
    middleware: ['admin-auth'],
    extends: Bar,
    async asyncData({store}){
        const posts = await store.dispatch('post/fetch');
        return {posts};
    },
    mounted(){
        let posts = 0;
        let views = 0;
        let comments = 0;
        this.posts.forEach(function(element) {
            posts = posts + 1;
            views = views + Number(element.views);
            comments = comments + element.all_comments.length;
            console.log(JSON.stringify(element));
        });

        const data = {
        labels: ['Posts', 'Views', 'Comments'],
        datasets: [{
            label: 'Statistics',
            data: [posts, views, comments],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]};

        const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                    }
                }]
            }
        };

        this.renderChart(data,options);
    }
}
</script>