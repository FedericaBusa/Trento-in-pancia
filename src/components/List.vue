blue<template>
  <div>
    <div style="display: flex; justify-content:center">
      <md-button @click="load('all')">Tutti</md-button>
      <md-button @click="load('rest')">Pizzerie</md-button>
      <md-button @click="load('bar')">Bar</md-button>
      <md-button @click="load('other')">Altro</md-button>
    </div>

    <div style="display: flex;flex-wrap:wrap;margin-top:30px;padding: 0 12px; justify-content: center">
      <!--<template v-if="index % 2 == 0">
        <div style="width: 30%">
          <img :src="f.image" v-if="f.image != undefined" />
          <div class="grey-image" v-else>Immagine non disponibile</div>
        </div>
        <div style="width: 70%; display: flex">
          <md-button
            style="align-self:center;"
            :style="{ 'font-size': wid < 380 ? '0.75rem' : '1.15rem' }"
            @click="openInfo(f)"
          >
            <span style="word-wrap: break-word; margin-right: 10px;">{{
              f.title.it
            }}</span>
            <md-icon>search</md-icon>
          </md-button>
        </div>
      </template>-->
      <md-card
        v-for="(f, index) in focus"
        :key="index"
        style="width: 200px;margin: 0 12px 24px"
        @click.native="openInfo(f)"
      >
        <md-card-media style="height: 200px">
          <img :src="f.image" v-if="f.image != undefined" style="height: 100%;object-fit: cover"/>
        </md-card-media>

        <md-card-header>
          <div class="md-title" style="font-size: 20px">{{f.title.it}}</div>
          <!--<div class="md-subhead">
            <div style="display:flex; margin-top: 10px">
              <md-icon
                style="margin-left:0"
                :style="{ color: stars >= 1 ? 'gold' : '' }"
              >star</md-icon>
              {{f}}
            </div>
          </div>-->
        </md-card-header>
      </md-card>

      <!--<template v-else>
        <div style="width: 70%; display: flex;">
          <md-button
            style="align-self:center;"
            :style="{ 'font-size': wid < 380 ? '0.75rem' : '1.15rem' }"
            @click="openInfo(f)"
            ><span style="word-wrap: break-word; margin-left: 10px">{{
              f.title.it
            }}</span
            ><md-icon>search</md-icon>
          </md-button>
        </div>
        <div style="width: 30%;">
          <img :src="f.image" v-if="f.image != undefined" />
          <div class="grey-image" v-else>Immagine non disponibile</div>
        </div>
      </template>-->
    </div>

    <md-dialog :md-active.sync="showDialog">
      <template v-if="wid > 376">
        <div
          v-if="selected"
          style="width:100%;display:flex;flex-direction:row;justify-content:space-between;align-items:center;margin-bottom: 20px"
        >
          <md-dialog-title
            style="padding:10px 0;font-size:25px;text-align:left;margin: 0"
          >{{ selected.title.it }}</md-dialog-title>
          <md-button
            style="align-self:center;margin: 0px"
            @click="sendFavorite($event,selected)"
            ><md-icon
              :style="{ color: selected.favorites === true ? 'red' : '' }"
              >favorite</md-icon
            ></md-button>
        </div>

        <div style="display:flex;width:100%;min-width:620px" v-if="selected">
          <div style="width:50%;height:100%;align-self:flex-start;display:flex">
            <img :src="selected.image" style="max-width:90%;min-width:250px" />
          </div>
          <div style="width:50%">
            <div style="padding: 0px;font-size:20px;">
              <p style="margin: 0 0 16px">
                Categoria: {{ selected.cat.it[0] }}
              </p>
              <p style="margin: 0 0 16px">
                Telefono: {{ selected.contacts.phone }}
              </p>

              <div style="margin: 0 0 16px">
                <md-button style="background-color:#c5e1a5;border-radius:10px;margin: 0">
                  <div style="display:flex;align-items:center">
                    Chiama ora<md-icon style="margin-left:8px">phone</md-icon>
                  </div>
                </md-button>
              </div>
            </div>

            <div style="display:flex;flex-direction: column;font-size:18px">
              <div style="display: flex; flex-direction:column; margin-bottom: 16px">
                <div>
                  Lascia un voto:
                </div>
                <div style="display:flex; margin-top: 10px">
                  <li @click="setStar(1)" style="list-style-type:none">
                    <md-icon
                      style="margin-left:0"
                      :style="{ color: stars >= 1 ? 'gold' : '' }"
                      >star</md-icon
                    >
                  </li>
                  <li @click="setStar(2)" style="list-style-type:none">
                    <md-icon
                      style="margin-left:0"
                      :style="{ color: stars >= 2 ? 'gold' : '' }"
                      >star</md-icon
                    >
                  </li>
                  <li @click="setStar(3)" style="list-style-type:none">
                    <md-icon
                      style="margin-left:0"
                      :style="{ color: stars >= 3 ? 'gold' : '' }"
                      >star</md-icon
                    >
                  </li>
                  <li @click="setStar(4)" style="list-style-type:none">
                    <md-icon
                      style="margin-left:0"
                      :style="{ color: stars >= 4 ? 'gold' : '' }"
                      >star</md-icon
                    >
                  </li>
                  <li @click="setStar(5)" style="list-style-type:none">
                    <md-icon
                      style="margin-left:0"
                      :style="{ color: stars >= 5 ? 'gold' : '' }"
                      >star</md-icon
                    >
                  </li>
                </div>
              </div>
              <div
                style="width: 100%; display: flex; align-items: center;  justify-content: left;"
                v-if="selected.nvotes > 0"
              >
                Media: {{ selected.average }} ({{ selected.nvotes }}
                {{ selected.nvotes > 1 ? "voti" : "voto" }})
              </div>
            </div>
          </div>
        </div>

        <md-dialog-actions>
          <md-button @click="showDialog = false">Chiudi</md-button>
        </md-dialog-actions>
      </template>

      <template v-else>
        <md-dialog-title
          v-if="selected"
          style="padding:10px;font-size:1.15rem;text-align:center"
          >{{ selected.title.it }}</md-dialog-title
        >
        <div style="display:flex;width:100%; flex-wrap: wrap" v-if="selected">
          <div style="width:100%;">
            <img :src="selected.image" />
          </div>
          <div style="width:100%">
            <p style="padding:10px;font-size:20px">
              Nome: {{ selected.title.it }} <br />
              Categoria: {{ selected.cat.it[0] }} <br />
              Telefono: {{ selected.contacts.phone }} <br />
              <md-button style="background-color:#c5e1a5;border-radius:10px">
                Chiama ora <md-icon>phone</md-icon>
              </md-button>
              <md-button
                style="align-self:center;margin-left:15px"
                @click="sendFavorite($event,selected)"
                ><md-icon
                  :style="{ color: selected.favorites === true ? 'red' : '' }"
                  >favorite</md-icon
                ></md-button
              >
            </p>

            <div style="display:flex; padding:10px;font-size:18px">
              <div style="display: flex; flex-direction:column;">
                <div>
                  Lascia un voto:
                </div>
                <div style="display:flex; margin-top: 10px">
                  <li @click="setStar(1)" style="list-style-type:none">
                    <md-icon
                      style="margin-left:10px"
                      :style="{ color: stars >= 1 ? 'gold' : '' }"
                      >star</md-icon
                    >
                  </li>
                  <li @click="setStar(2)" style="list-style-type:none">
                    <md-icon
                      style="margin-left:10px"
                      :style="{ color: stars >= 2 ? 'gold' : '' }"
                      >star</md-icon
                    >
                  </li>
                  <li @click="setStar(3)" style="list-style-type:none">
                    <md-icon
                      style="margin-left:10px"
                      :style="{ color: stars >= 3 ? 'gold' : '' }"
                      >star</md-icon
                    >
                  </li>
                  <li @click="setStar(4)" style="list-style-type:none">
                    <md-icon
                      style="margin-left:10px"
                      :style="{ color: stars >= 4 ? 'gold' : '' }"
                      >star</md-icon
                    >
                  </li>
                  <li @click="setStar(5)" style="list-style-type:none">
                    <md-icon
                      style="margin-left:10px"
                      :style="{ color: stars >= 5 ? 'gold' : '' }"
                      >star</md-icon
                    >
                  </li>
                </div>
              </div>

              <br />
              <div
                style="width: 100%; display: flex; align-items: center; justify-content: center;"
              >
                Media: {{ selected.average }} da {{ selected.nvotes }}
                {{ selected.nvotes > 1 ? "voti" : "voto" }}
              </div>
            </div>
          </div>
        </div>
        <md-dialog-actions>
          <md-button @click="showDialog = false" style="font-weight: 900"
            >Chiudi</md-button
          >
        </md-dialog-actions>
      </template>
    </md-dialog>

    <md-dialog :md-active.sync="showStarConfirm">
      <md-dialog-title style="padding:10px;text-align:center; font-size:25px;"
        >Conferma voto</md-dialog-title
      >
      <div v-if="selected">
        <p style="font-size: 20px;margin: 0 0 8px">
          Hai votato <strong>{{ selected.title.it }} </strong> con {{ stars }} stelle! <br />
        </p>
        <p style="font-size: 20px;margin: 0">
          Vuoi inviare il tuo voto?
        </p>

        <md-dialog-actions style="margin-top: 16px">
          <md-button @click="sendVote">Conferma</md-button>
          <md-button @click="showStarConfirm = false">Chiudi</md-button>
        </md-dialog-actions>
      </div>
    </md-dialog>

    <md-snackbar
      md-position="center"
      :md-duration="snackbarDuration"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>Non sei loggato, esegui il login per votare un ristorante!</span>
      <md-button class="md-primary" @click="redirectLogin">Login</md-button>
      <md-button class="md-primary" @click="showSnackbar = false"
        >Chiudi</md-button
      >
    </md-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      wid: window.innerWidth,
      search: "",
      items: [],
      focus: [],
      showDialog: false,
      showStarConfirm: false,
      showSnackbar: false,
      selected: null,
      stars: 0,
      snackbarDuration: 4000,
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  created() {
    this.load(localStorage.getItem("toSearch"));
  },

  methods: {
    load(val) {
      localStorage.setItem("toSearch", val);
      this.search = localStorage.getItem("toSearch");
      const url =
        "https://os.smartcommunitylab.it/comuneintasca-multi/restaurants/TrentoInTasca";
      const data_default = { center: [46.067369, 11.121311], radius: 0.01 };
      axios
        .post(url, data_default)
        .then((res) => {
          this.items = [];
          const populate = res.data.map((item) => this.items.push(item));
          switch (localStorage.getItem("toSearch")) {
            case "all":
              this.focus = this.items;
              break;
            case "rest":
              this.focus = res.data.filter(
                (item) =>
                  item.cat.it[0] == "Ristorante" || item.cat.it[0] == "Pizzeria"
              );
              break;
            case "bar":
              this.focus = res.data.filter((item) => item.cat.it[0] == "Bar");
              break;
            case "other":
              this.focus = res.data.filter(
                (item) =>
                  item.cat.it[0] !== "Bar" &&
                  item.cat.it[0] !== "Ristorante" &&
                  item.cat.it[0] !== "Pizzeria"
              );
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    openInfo(val) {
      this.selected = val;
      const db = firebase.firestore();
      var vueInstance = this;
      this.stars = 0;

      //get voti
      db.collection("votes")
        .where("restid", "==", this.selected.id)
        .get()
        .then(function(querySnapshot) {
          var s = 0;
          if (!querySnapshot.empty) {
            querySnapshot.forEach((d) => {
              s += d.data().stars;
            });
            vueInstance.selected.average = (s / querySnapshot.size).toFixed(1);
            vueInstance.selected.nvotes = querySnapshot.size;
            vueInstance.stars = vueInstance.selected.average;

            if (vueInstance.user.loggedIn == true) {
              db.collection("votes")
                .where("usermail", "==", vueInstance.user.data.email)
                .where("restid", "==", vueInstance.selected.id)
                .get()
                .then(function(querySnapshot) {
                  if (!querySnapshot.empty) {
                    querySnapshot.forEach((d) => {
                      vueInstance.selected.docid = d.id;
                    });
                  }
                });
            }
          }
        });

      //get fav
      if (this.user.loggedIn == true) {
        db.collection("favorites")
          .where("restid", "==", this.selected.id)
          .where("usermail", "==", this.user.data.email)
          .get()
          .then(function(querySnapshot) {
            if (!querySnapshot.empty) {
              querySnapshot.forEach((d) => {
                vueInstance.selected.docfav = d.id;
                vueInstance.selected.favorites = true;
              });
            }
          })
          .then(() => {
            this.showDialog = true;
          });
      } else {
        this.showDialog = true;
      }
    },

    setStar(s) {
      this.stars = s;
      this.showStarConfirm = true;
    },

    sendVote() {
      const db = firebase.firestore();
      if (this.user.loggedIn == false) {
        this.showSnackbar = true;
      } else {
        if (this.selected.docid) {
          db.collection("votes")
            .doc(this.selected.docid)
            .update({ stars: this.stars })
            .then(() => {
              this.showStarConfirm = false;
              //this.showDialog = false;
            });
        } else {
          db.collection("votes")
            .doc()
            .set({
              stars: this.stars,
              usermail: this.user.data.email,
              restid: this.selected.id,
              restname: this.selected.title.it,
            })
            .then(() => {
              this.showStarConfirm = false;
              //this.showDialog = false;
            });
        }
      }
    },

    redirectLogin() {
      this.showSnackbar = false;
      this.showStarConfirm = false;
      this.$router.replace({ name: "Login" });
    },

    sendFavorite(e,v) {
      console.log(e.target);
      const db = firebase.firestore();
      if (this.user.loggedIn == false) {
        this.showSnackbar = true;
      } else {
        if (!v.favorites) {
          db.collection("favorites")
            .doc()
            .set({
              restid: v.id,
              usermail: this.user.data.email,
              restname: this.selected.title.it,
            })
            .then(() => {
              //operatore ternario --> if (e.sty === 'red) {} else {}
              console.log ("ciao")
              e.target.style.color === 'red' ? e.target.style.color = 'grey' : e.target.style.color= 'red'
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          db.collection("favorites")
            .doc(v.docfav)
            .delete()
            .then(() => {
              //operatore ternario --> if (e.sty === 'red) {} else {}
              e.target.style.color === 'red' ? e.target.style.color = 'grey' : e.target.style.color= 'red'
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
  },
};
</script>

<style scoped>
.md-dialog /deep/ .md-dialog-container {
  padding: 50px;
  border-radius: 10px;
  font-size: 30px;
  text-align: left;
  min-height: 200px !important;
}

.grey-image {
  width: 100%;
  height: 100%;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: #fff;
  font-weight: 900;
}
</style>
