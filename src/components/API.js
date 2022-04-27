import axios from "axios"

const base = "https://mediassist.herokuapp.com/"
// const base = "http://127.0.0.1:8000/"

export default class API{
    static async update_customer(cust,cust_id){
        console.log(cust,cust_id)
        return await axios.create({baseURL: base})
                .put(`medi/customer/${cust_id}`, {cust})
    }
    static async update_policy(policy,pol_id,v_seg,v_fuel){
        // console.log("policy",pol)
        return axios.create({baseURL: base})
            .put(`medi/policy/${pol_id}`, {policy, "segment": v_seg, "fuel": v_fuel});
    }
    static async fetch_policy(pol_id){
        console.log(pol_id)
        return axios.create({baseURL:base})
            .get(`medi/policysearch/?search=policy&id=${pol_id}`)
    }
}

