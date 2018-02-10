package com.codeartisans.bugtracker.domain

import com.fasterxml.jackson.annotation.JsonIgnore
import org.hibernate.annotations.Cache
import org.hibernate.annotations.CacheConcurrencyStrategy

import javax.persistence.*
import javax.validation.constraints.*

import java.io.Serializable
import java.util.HashSet
import java.util.Objects

/**
 * A Label.
 */
@Entity
@Table(name = "label")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
class Label : Serializable {

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    var id: Long? = null

    @NotNull
    @Size(min = 3)
    @Column(name = "jhi_label", nullable = false)
    var label: String? = null

    @ManyToMany(mappedBy = "labels")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private var tickets: MutableSet<Ticket> = mutableSetOf()

    fun label(label: String): Label {
        this.label = label
        return this
    }

    fun getTickets(): Set<Ticket> {
        return tickets
    }

    fun tickets(tickets: MutableSet<Ticket>): Label {
        this.tickets = tickets
        return this
    }

/*
    fun addTicket(ticket: Ticket): Label {
        this.tickets.add(ticket)
        ticket.labels.add(this)
        return this
    }

    fun removeTicket(ticket: Ticket): Label {
        this.tickets.remove(ticket)
        ticket.labels.remove(this)
        return this
    }

    fun setTickets(tickets: MutableSet<Ticket>) {
        this.tickets = tickets
    }
*/
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    override fun equals(o: Any?): Boolean {
        if (this === o) {
            return true
        }
        if (o == null || javaClass != o.javaClass) {
            return false
        }
        val label = o as Label?
        return if (label!!.id == null || id == null) {
            false
        } else id == label.id
    }

    override fun hashCode(): Int {
        return Objects.hashCode(id)
    }

    override fun toString(): String {
        return "Label{" +
                "id=" + id +
                ", label='" + label + "'" +
                "}"
    }

    companion object {

        private const val serialVersionUID = 1L
    }
}
