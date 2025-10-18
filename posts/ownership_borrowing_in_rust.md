---
title: 'Understanding Ownership and Borrowing in Rust'
date: '2025-10-10'
excerpt: 'This post will demystify ownership and borrowing with beginner-friendly examples, diagram, and a clear table of rules.'
---

If you're starting with Rust, you've probably run into the concepts of **ownership**, **borrowing**, and **lifetimes** - and maybe you've hit a few compiler errors that made your head spin.

Don't worry - you're not alone.

---

## What You'll Learn

- What is Ownership in Rust?
- Move vs Copy
- Borrowing: Immutable & Mutable
- Common errors and how to fix them
- Summary table and mental model

---

## What is Ownership? 

Rust uses a unique system called **Ownership** to manage memory *without a garbage collector*.

**Key rules:**

1. Each value has a single owner.
2. When the owner goes out of scope, the value is dropped.
3. Values can be moved or borrowed, but not both at the same time.

---

## Example: Ownership Transfer (Move)

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;

    println!("{}", s1); // Error: value borrowed after move
}
```

**Why the error?**

When you do `let s2 = s1;`, Rust moves the ownership of the heap data to `s2`. Now `s1` is no longer valid.

---

## Fixing it with Borrowing

```rust
fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("Length of '{}' is {}", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

**Output:**

```bash
Length of 'hello' is 5
```

We passed a reference (`&s1`) to `calculate_length`, so ownership is not moved.

---

## Mutable Borrowing

```rust
fn main() {
    let mut s = String::from("hello");
    change(&mut s);
    println!("{}", s);
}

fn change(s: &mut String) {
    s.push_str(", world");
}
```

**Output:**

```bash
hello, world
```
> Rust only allows one mutable references at a time to prevent data races.

---

## Visualizing Ownership

```text
+------------------+        +------------------+
|   let s1 = ...   | ---->  | "hello" in heap  |
+------------------+        +------------------+

   let s2 = s1;  // s1 moved to s2

+------------------+        +------------------+
|   s2 owns data   | ---->  | "hello" in heap  |
+------------------+        +------------------+
```

---

## Common Errors 

### 1. Multiple mutable borrows

```rust
let r1 = &mut s;
let r2 = &mut s; // error
```
> Fix: Only allow one mutable reference at a time

### 2. Borrowing after move 

```rust
let s1 = String::from("hey");
let s2 = s1;
println!("{}", s1); // use of moved value
```
> Fix: Use references or clone if needed

---

## Final Thoughts

Rust’s ownership system can seem strict at first — but it saves you from **memory leaks**, **data races**, and **null pointer bugs** without a garbage collector.

> Tip: If you're confused, slow down, read the error message. The Rust compiler is your friend, not your enemy.

---

## Further Reading

- [The Rust Book: Ownership](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html)
- [Rustlings Exercises](https://github.com/rust-lang/rustlings)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)

---

### Thanks for reading! 
