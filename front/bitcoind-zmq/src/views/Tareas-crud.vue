<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md6>
        <v-card class="mb-3" v-for="(item, index) in listaTareas" :key="index">
          <v-card-text>
            <v-chip label color="pink" text-color="white" class="ml-0">
              <v-icon left>label</v-icon>
              {{item.titulo}}
            </v-chip>
            <p>{{item.descripcion}}</p>
            <v-btn color="warning" class="ml-0" @click="editar(index)">Editar</v-btn>
            <v-btn color="error" @click="eliminarTarea(item.id)">Eliminar</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex md6 v-if="formAgregar">
        <v-card class="mb-3 pa-3">
          <v-form @submit.prevent="agregarTarea">
            <v-text-field label="Título de la tarea" v-model="titulo"></v-text-field>
            <v-textarea label="Descripción de la tarea" v-model="descripcion"></v-textarea>
            <v-btn color="success" block type="submit">Agregar tarea</v-btn>
          </v-form>
        </v-card>
      </v-flex>

      <v-flex md6 v-if="!formAgregar">
        <v-card class="mb-3 pa-3">
          <v-form @submit.prevent="editarTarea">
            <v-text-field label="Título de la tarea" v-model="titulo"></v-text-field>
            <v-textarea label="Descripción de la tarea" v-model="descripcion"></v-textarea>
            <v-btn color="warning" block type="submit">Editar tarea</v-btn>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>

    <v-snackbar v-model="snackbar">
      {{mensaje}}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      listaTareas: [
        {
          id: 1,
          titulo: "Título tarea #1",
          descripcion:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora necessitatibus deleniti omnis obcaecati dignissimos. Ratione maiores aliquid perspiciatis, illum nostrum libero blanditiis, id doloribus earum, laborum itaque tenetur possimus adipisci!"
        },
        {
          id: 2,
          titulo: "Título tarea #2",
          descripcion:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora necessitatibus deleniti omnis obcaecati dignissimos. Ratione maiores aliquid perspiciatis, illum nostrum libero blanditiis, id doloribus earum, laborum itaque tenetur possimus adipisci!"
        }
      ],
      titulo: "",
      descripcion: "",
      snackbar: false,
      mensaje: "",
      formAgregar: true,
      indexTarea: ""
    };
  },
  methods: {
    agregarTarea() {
      if (this.titulo === "" || this.descripcion === "") {
        this.snackbar = true;
        this.mensaje = "Llena todos los campos!";
      } else {
        this.listaTareas.push({
          id: Date.now(),
          titulo: this.titulo,
          descripcion: this.descripcion
        });
        this.titulo = "";
        this.descripcion = "";
        this.snackbar = true;
        this.mensaje = "Tarea agregada";
      }
    },
    eliminarTarea(id) {
      this.listaTareas = this.listaTareas.filter(e => e.id != id);
    },
    editar(index) {
      this.formAgregar = false;
      this.titulo = this.listaTareas[index].titulo;
      this.descripcion = this.listaTareas[index].descripcion;
      this.indexTarea = index;
    },
    editarTarea() {
      this.listaTareas[this.indexTarea].titulo = this.titulo;
      this.listaTareas[this.indexTarea].descripcion = this.descripcion;
      this.formAgregar = true;
      this.titulo = "";
      this.descripcion = "";
      this.snackbar = true;
      this.mensaje = "Tarea editada";
    }
  }
};
</script>
