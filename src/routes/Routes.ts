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
    },
    turnovers: {
        path: '/turnovers',
        children: {
            inst: {
                path: 'inst',
                fullPath: '/turnovers/inst'
            },
            sct: {
                path: 'sct',
                fullPath: '/turnovers/sct'
            },
            sdd: {
                path: 'sdd',
                fullPath: '/turnovers/sdd'
            }
        }
    }
}
