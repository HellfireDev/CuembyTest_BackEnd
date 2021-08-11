const orderBy = order => {
    switch (order) {
        case 'asc':
            return 'asc';

        case 'desc':
            return 'desc';

        default:
            return 'asc';
    }
};

module.exports = { orderBy };