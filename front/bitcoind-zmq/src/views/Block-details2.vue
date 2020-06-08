<template>
  <div class="mt-5">
    <span v-for="(it,j) in its" :key="j">
      <p>Transaction {{j}}</p>
      <div class="text-center d-flex pb-4">
        <v-btn @click="all(j)">all</v-btn>
        <div>{{ panel[j] }}</div>
        <v-btn @click="none(j)">none</v-btn>
      </div>

      <v-expansion-panels v-model="panel[j]" multiple>
        <v-expansion-panel v-for="(item,i) in items" :key="i">
          <v-expansion-panel-header>Elemento {{ item }}</v-expansion-panel-header>
          <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: 3,
      its: 3,
      panel: []
    };
  },
  created() {
    //this.tx.lenght en vez de this.items
    for (let i = 0; i < this.items; i++) {
      this.panel[i] = [];
    }
  },
  methods: {
    // Create an array the length of our items
    // with all values as true
    all(x) {
      const newdata = [...Array(this.items).keys()].map((k, i) => i);

      if (this.panel[x] !== undefined) {
        this.panel.splice(x, 1, newdata);
      } else {
        this.panel.push(newdata);
      }
      console.log("PANEL AAAA", this.panel);
    },
    // Reset the panel
    none(x) {
      this.panel.splice(x, 1, []);
      console.log("PANEL", this.panel);
    }
  }
};
</script>
