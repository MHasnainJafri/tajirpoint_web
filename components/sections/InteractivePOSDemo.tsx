'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/atoms/Button';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const products = [
  { id: 1, name: 'Laptop', price: 85000, image: '💻' },
  { id: 2, name: 'Smartphone', price: 45000, image: '📱' },
  { id: 3, name: 'Tablet', price: 35000, image: '⌨️' },
  { id: 4, name: 'Headphones', price: 8000, image: '🎧' },
  { id: 5, name: 'Smart Watch', price: 15000, image: '⌚' },
  { id: 6, name: 'Camera', price: 95000, image: '📷' },
];

export function InteractivePOSDemo() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: typeof products[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        { ...product, quantity: 1 },
      ];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="relative py-20 sm:py-32 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            Try Our POS in Action
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Click products below to add them to the cart and experience lightning-fast checkout.
          </p>
        </motion.div>

        {/* Interactive Demo */}
        <motion.div
          className="grid gap-8 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Product Grid */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              className="grid gap-4 grid-cols-2 sm:grid-cols-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            >
              {products.map((product, idx) => (
                <motion.button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/50 p-4 transition-all hover:border-primary/50 hover:shadow-xl"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/10 to-accent/10 transition-opacity" />

                  <div className="relative space-y-3">
                    <div className="text-5xl text-center">{product.image}</div>
                    <div className="text-center space-y-1">
                      <p className="text-sm font-semibold text-foreground">
                        {product.name}
                      </p>
                      <p className="text-lg font-bold text-primary">
                        PKR {product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Add button indicator */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="rounded-full bg-primary text-primary-foreground p-2">
                      <Plus className="h-4 w-4" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Receipt/Cart */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-24 rounded-2xl border border-border/40 bg-card/80 backdrop-blur p-6 space-y-6 shadow-2xl">
              {/* Header */}
              <div className="space-y-2 border-b border-border/40 pb-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Order Receipt
                </h3>
                <p className="text-xs text-muted-foreground">
                  Items: {itemCount}
                </p>
              </div>

              {/* Cart Items */}
              <div className="space-y-3 max-h-72 overflow-y-auto">
                <AnimatePresence mode="popLayout">
                  {cart.length === 0 ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-muted-foreground text-center py-8"
                    >
                      Add items to get started
                    </motion.p>
                  ) : (
                    cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="flex items-start justify-between gap-3 p-3 rounded-lg bg-secondary/50 border border-border/40"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PKR {item.price.toLocaleString()}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-background rounded-lg p-1">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                          >
                            <Minus className="h-3 w-3" />
                          </motion.button>
                          <span className="text-sm font-semibold text-foreground min-w-6 text-center">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                          >
                            <Plus className="h-3 w-3" />
                          </motion.button>
                        </div>

                        {/* Delete Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 hover:bg-destructive/10 rounded text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* Totals */}
              {cart.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3 border-t border-border/40 pt-4"
                >
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold text-foreground">
                      PKR {total.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Tax (5%)</span>
                    <span className="font-semibold text-foreground">
                      PKR {Math.round(total * 0.05).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold border-t border-border/40 pt-3">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">
                      PKR {Math.round(total * 1.05).toLocaleString()}
                    </span>
                  </div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="accent" size="lg" className="w-full">
                      Complete Sale
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
