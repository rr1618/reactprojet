import axios from "axios"

const base = "https://mediassist.herokuapp.com/"
// const base = "http://localhost:3000/"

export default class API{
    static async update_customer(cust,cust_id,){
        return await axios.create({baseURL: base})
                .put(`medi/customer/${cust_id}`, {cust})
    }
    static async update_policy(pol,pol_id,v_seg,v_fuel){
        return axios.create({baseURL: base})
            .put(`medi/policy/${pol_id}`, {pol, "segment": v_seg, "fuel": v_fuel});
    }
    static async fetch_policy(pol_id){
        return axios.create({baseURL:base})
            .get(`medi/policysearch/?search=policy&id=${pol_id}`)
    }
}

