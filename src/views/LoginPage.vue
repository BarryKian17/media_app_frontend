<template>
  <div class="d-flex justify-content-end me-5">
    <!-- <p class="btn btn-sm btn-danger text-white mx-3" @click="home()">Home</p> -->
    <p class="btn btn-sm btn-danger text-white mx-3 me-5" @click="login()">Login</p>
  </div>
  <div class="col-5 offset-2">
    
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="userData.email">

  </div>
  <div class="">
      <p class="bg-danger text-white" v-if="checkStatus">* The Credential does not Match *</p>
    </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" v-model="userData.password">
  </div>

  <button type="submit" class="btn btn-sm" @click="acc()">Submit</button>


</div>
</template>
 
<script src="../js/LoginPage.js"></script>
