<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-card>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"></v-img>

          <v-card-title>
            <h2>Lorem, ipsum dolor.</h2>
          </v-card-title>

          <v-card-text>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum similique impedit, corporis accusantium unde ex hic saepe sequi consectetur, temporibus id pariatur, modi officia assumenda dolor! Rem voluptas facere veniam!</p>
          </v-card-text>

          <v-card-actions>
            <v-btn color="info" text>Acción</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 sm6>
        <v-card>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg">
            <v-container>
              <v-layout>
                <v-flex>
                  <span class="headline white--text">Lorem, ipsum dolor.</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>

          <v-card-title>
            <h2>Lorem, ipsum dolor.</h2>
          </v-card-title>

          <v-card-text>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum similique impedit, corporis accusantium unde ex hic saepe sequi consectetur, temporibus id pariatur, modi officia assumenda dolor! Rem voluptas facere veniam!</p>
          </v-card-text>

          <v-card-actions>
            <v-btn color="info" text @click="dialog = true">Acción</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-card-title>Este es el título</v-card-title>
        <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem libero magnam quas pariatur quo, repellendus expedita ipsum ex velit, quis temporibus iure, fugit mollitia illo natus enim veritatis iusto odit?</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click="dialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      dialog: false
    };
  }
};
</script>
