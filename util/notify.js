import cogoToast from 'cogo-toast';

module.exports = {
    success: (msg) => {
        cogoToast.success(msg)
    },
    warn: (msg) => {
        cogoToast.warn(msg)
    }
}