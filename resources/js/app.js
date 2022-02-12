require('./bootstrap');

// Import modules...

import Vue from 'vue';
import { createApp, h } from 'vue';
import { App as InertiaApp, plugin as InertiaPlugin } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';



const el = document.getElementById('app');

// .config.globalProperties.$filters = {
//     timeAgo(created) {
//       return moment(created).fromNow();
//     }
//   }
window.Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})


createApp({
    render: () =>
        h(InertiaApp, {
            initialPage: JSON.parse(el.dataset.page),
            resolveComponent: (name) => require(`./Pages/${name}`).default,
        }),
})

    .component('icon', require('./Components/Icon').default)
    .mixin({ methods: { route } })
    .use(InertiaPlugin)
    .mount(el);

InertiaProgress.init({ color: '#4B5563' });

