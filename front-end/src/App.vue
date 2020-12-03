<template>
<div id="app">
  <div class="header">
    <div class="title">
      <h1>~ Fantasy Character Creator ~</h1>
      <div class="links">
        <router-link to="/" class="subLink">Characters Page</router-link>
        <router-link to="/admin" class="subLink">Admin </router-link>
        <router-link to="/creation" class="subLink">Character Creation</router-link>
      </div>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <footer>
      <a href="https://github.com/darrow97/creativeproject4" target="_blank">Click here for access to the Git Repository</a>
    </footer>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
  min-height: 900px;
  background:
    radial-gradient(black 15%, transparent 16%) 0 0,
    radial-gradient(black 15%, transparent 16%) 8px 8px,
    radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px,
    radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px;
  background-color: #556052;
  background-size:16px 16px;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #AF6B58;
  color: #000000;
  justify-content: center;
  border-bottom: 3px solid black;
}

.title {
  margin-top: 5px;
  margin-bottom: 5PX;
  justify-content: center;
}

.title h1 {
  font-size: 30px;
  margin: 10px;
}

.links {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-decoration: none;
  color: #000000;
  /* border: 2px solid yellow; */
}

.subLink {
  color: #000000;
  font-weight: bold;
}

.content {
  padding: 20px 100px;
  min-height: 700px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #e3e3e3;
  font-size: 12px;
}

.footer a {
  color: #000;
}

footer
{
	text-align: center;
	height: 25px;
	width: 100%;
	background: #000000;
	position: fixed;
	left: 0;
	bottom: 0;
}

footer a {
  color: #ffffff;
}

h1 {
  font-size: 20px;
}
</style>
