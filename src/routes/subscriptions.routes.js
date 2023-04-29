import { Router } from "express";
import { getSubscriptionsStatus,
         getSubscriptionsUserApp,   
         addSubscription, 
         getSubscriptionsForMonth, 
         getSubscriptionsForYear,
         getSubscriptionsAll,
         getDailyPaymentsMonth,  
         getDailyPaymentsYear,
         getDailyPayments,
         deleteSubscriptionsActive} from "../controllers/subscriptions.contoller.js";

const router = new Router();

router.get("/status/:id",  getSubscriptionsStatus)

router.delete("/active/:id_user/:id_application",  deleteSubscriptionsActive)

router.get("/:id_user/:id_application",  getSubscriptionsUserApp)

router.get("/month/:id_application/:month/:year",  getSubscriptionsForMonth)

router.get("/year/:id_application/:year",  getSubscriptionsForYear)

router.get("/:id_application", getSubscriptionsAll)

router.get("/daily_payments/month/:id_application/:month/:year",getDailyPaymentsMonth)

router.get("/daily_payments/year/:id_application/:year",getDailyPaymentsYear)

router.get("/daily_payments/all/:id_application",getDailyPayments)

router.post("/" , addSubscription);
export default router