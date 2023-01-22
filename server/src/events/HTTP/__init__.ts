import HttpEvent from "../../structures/Events/HttpEvent";

export default new HttpEvent({
    route: '/',
    async callback(_req, res) {
        res.end('reached');
    }
})