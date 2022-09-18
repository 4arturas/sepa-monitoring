export const routes = {
    home: {
        path: '/'
    },
    login: {
        path: '/login'
    },
    payments: {
        path: '/payments',
        children: {
            inst: {
                path: 'inst',
                fullPath: '/payments/inst'
            },
            sct: {
                path: 'sct',
                fullPath: '/payments/sct'
            },
            sdd: {
                path: 'sdd',
                fullPath: '/payments/sdd'
            }
        }
    }
}