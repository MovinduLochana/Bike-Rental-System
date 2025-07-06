import { CreditCard } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Image from "next/image";
import { Lock } from "lucide-react";

const formatCardNumber = (value: string) => {
  if (!value) return value;

  const cleaned = value.replace(/\D/g, "");
  // Limit to 16 digits
  // const limited = cleaned.substring(0, 16);
  // Add space after every 4 digits
  // const formatted = limited.replace(/(\d{4})(?=\d)/g, "$1 ");

  return cleaned;
};

// Format expiry date as MM/YY
const formatExpiryDate = (value: string) => {
  if (!value) return value;

  // Remove all non-digits
  const cleaned = value.replace(/\D/g, "");
  // Limit to 4 digits
  const limited = cleaned.substring(0, 4);

  // Add slash after first 2 digits if there are more than 2
  if (limited.length > 2) {
    return `${limited.substring(0, 2)}/${limited.substring(2)}`;
  }

  return limited;
};

type PaymentDataFormProps = {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isProcessing: boolean;
  totalAmount: number;
  cardNumber: string;
  setCardNumber: (value: string) => void;
  cardName: string;
  setCardName: (value: string) => void;
  expiryDate: string;
  setExpiryDate: (value: string) => void;
  cvv: string;
  setCvv: (value: string) => void;
};

export default function PaymentDataForm({
  paymentMethod,
  setPaymentMethod,
  handleSubmit,
  isProcessing,
  totalAmount,
  cardNumber,
  setCardNumber,
  cardName,
  setCardName,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv,
}: PaymentDataFormProps) {
  return (
    <div className="lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Select your preferred payment method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="card" className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Credit/Debit Card
              </TabsTrigger>
              <TabsTrigger
                value="paypal"
                disabled
                className="flex items-center"
              >
                <span className="mr-2">
                  <svg width="14" height="14" viewBox="0 0 24 24">
                    <path
                      fill="#253B80"
                      d="M7.076 21.337H2.308a.641.641 0 0 1-.633-.74L4.964 1.86A.64.64 0 0 1 5.597 1.3h4.768c3.534 0 5.981 1.865 5.712 5.289-.269 3.424-2.123 5.29-5.657 5.29H7.988L7.076 21.336z"
                    />
                    <path
                      fill="#179BD7"
                      d="M23.209 7.313c-.24 3.477-2.312 5.367-5.932 5.367h-1.73l-.853 5.414c-.052.326-.328.568-.656.568h-3.783c-.374 0-.632-.346-.578-.71l1.944-12.317c.051-.326.327-.568.656-.568h4.847c3.422 0 5.683 1.773 5.084 5.369v-3.123z"
                    />
                  </svg>
                </span>
                PayPal
              </TabsTrigger>
            </TabsList>

            <TabsContent value="card" className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(formatCardNumber(e.target.value))
                        }
                        required
                        maxLength={19}
                        className="pr-10"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Image
                          src="/visa-mastercard.svg"
                          alt="Card logos"
                          width={40}
                          height={24}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) =>
                          setExpiryDate(formatExpiryDate(e.target.value))
                        }
                        required
                        maxLength={5}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        type="password"
                        value={cvv}
                        onChange={(e) =>
                          setCvv(
                            e.target.value.replace(/\D/g, "").substring(0, 3)
                          )
                        }
                        required
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <Lock className="h-3.5 w-3.5" />
                  <span>Your payment information is encrypted and secure</span>
                </div>

                <Button
                  type="submit"
                  className="w-full text-base"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing
                    ? "Processing..."
                    : `Pay LKR ${totalAmount.toLocaleString()}`}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="paypal">
              <div className="py-8 text-center text-gray-500">
                PayPal payment option coming soon.
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
