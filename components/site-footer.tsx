import Link from "next/link"
import { Shield } from "lucide-react"

export function SiteFooter() {
    return (
        <footer className="border-t bg-muted/50 py-12">
            <div className="container mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-4">
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                                <Shield className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="font-bold">Smart Insurance</span>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            AI-powered insurance solutions for modern India. IRDAI Registration No: IRDAI/HO/2024/12345
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 font-semibold">Products</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/products/motor" className="hover:text-primary">
                                    Motor Insurance
                                </Link>
                            </li>
                            <li>
                                <Link href="/products/health" className="hover:text-primary">
                                    Health Insurance
                                </Link>
                            </li>
                            <li>
                                <Link href="/products/travel" className="hover:text-primary">
                                    Travel Insurance
                                </Link>
                            </li>
                            <li>
                                <Link href="/products/home" className="hover:text-primary">
                                    Home Insurance
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 font-semibold">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/renew" className="hover:text-primary">
                                    Renew Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/customer/claims/new" className="hover:text-primary">
                                    File a Claim
                                </Link>
                            </li>
                            <li>
                                <Link href="/network" className="hover:text-primary">
                                    Network Hospitals
                                </Link>
                            </li>
                            <li>
                                <Link href="/downloads" className="hover:text-primary">
                                    Downloads
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 font-semibold">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>
                            <li>IRDAI Compliance</li>
                            <li>Grievance Redressal</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    © 2025 Smart Insurance. All rights reserved. | Insurance is subject to risk. For more details on risk
                    factors, terms and conditions, please read the sales brochure carefully before concluding a sale.
                </div>
            </div>
        </footer>
    )
}
