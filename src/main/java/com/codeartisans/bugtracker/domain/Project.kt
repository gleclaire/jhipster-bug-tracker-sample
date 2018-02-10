package com.codeartisans.bugtracker.domain

import org.hibernate.annotations.Cache
import org.hibernate.annotations.CacheConcurrencyStrategy

import javax.persistence.*

import java.io.Serializable
import java.util.Objects

/**
 * A Project.
 */
@Entity
@Table(name = "project")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
class Project : Serializable {

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    var id: Long? = null

    @Column(name = "name")
    var name: String? = null

    fun name(name: String): Project {
        this.name = name
        return this
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    override fun equals(o: Any?): Boolean {
        if (this === o) {
            return true
        }
        if (o == null || javaClass != o.javaClass) {
            return false
        }
        val project = o as Project?
        return if (project!!.id == null || id == null) {
            false
        } else id == project.id
    }

    override fun hashCode(): Int {
        return Objects.hashCode(id)
    }

    override fun toString(): String {
        return "Project{" +
                "id=" + id +
                ", name='" + name + "'" +
                "}"
    }

    companion object {

        private const val serialVersionUID = 1L
    }
}
