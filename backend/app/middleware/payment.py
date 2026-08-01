async def check_payment() -> dict:
    """
    Dummy payment middleware to check if payment is required.
    Always returns {"payment_verified": False} to trigger the payment challenge.
    """
    return {
        "payment_verified": False
    }
