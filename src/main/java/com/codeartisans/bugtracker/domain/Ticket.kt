package com.codeartisans.bugtracker.domain

import org.hibernate.annotations.Cache
import org.hibernate.annotations.CacheConcurrencyStrategy

import javax.persistence.*
import javax.validation.constraints.*

import java.io.Serializable
import java.time.LocalDate
import java.util.HashSet
import java.util.Objects

/**
 * A Ticket.
 */
@Entity
@Table(name = "ticket")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
class Ticket : Serializable {

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    var id: Long? = null

    @NotNull
    @Column(name = "title", nullable = false)
    var title: String? = null

    @Column(name = "description")
    var description: String? = null

    @Column(name = "due_date")
    var dueDate: LocalDate? = null

    @Column(name = "done")
    var isDone: Boolean? = null

    @ManyToOne
    var project: Project? = null

    @ManyToOne
    var assignedTo: User? = null

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "ticket_label", joinColumns = arrayOf(JoinColumn(name = "tickets_id", referencedColumnName = "id")), inverseJoinColumns = arrayOf(JoinColumn(name = "labels_id", referencedColumnName = "id")))
    private var labels: MutableSet<Label> = HashSet()

    fun title(title: String): Ticket {
        this.title = title
        return this
    }

    fun description(description: String): Ticket {
        this.description = description
        return this
    }

    fun dueDate(dueDate: LocalDate): Ticket {
        this.dueDate = dueDate
        return this
    }

    fun done(done: Boolean?): Ticket {
        this.isDone = done
        return this
    }

    fun project(project: Project): Ticket {
        this.project = project
        return this
    }

    fun assignedTo(user: User): Ticket {
        this.assignedTo = user
        return this
    }

    fun getLabels(): Set<Label> {
        return labels
    }

    fun labels(labels: MutableSet<Label>): Ticket {
        this.labels = labels
        return this
    }

/*
    fun addLabel(label: Label): Ticket {
        this.labels.add(label)
        label.getTickets().add(this)
        return this
    }

    fun removeLabel(label: Label): Ticket {
        this.labels.remove(label)
        label.getTickets().remove(this)
        return this
    }

*/
    fun setLabels(labels: MutableSet<Label>) {
        this.labels = labels
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    override fun equals(o: Any?): Boolean {
        if (this === o) {
            return true
        }
        if (o == null || javaClass != o.javaClass) {
            return false
        }
        val ticket = o as Ticket?
        return if (ticket!!.id == null || id == null) {
            false
        } else id == ticket.id
    }

    override fun hashCode(): Int {
        return Objects.hashCode(id)
    }

    override fun toString(): String {
        return "Ticket{" +
                "id=" + id +
                ", title='" + title + "'" +
                ", description='" + description + "'" +
                ", dueDate='" + dueDate + "'" +
                ", done='" + isDone + "'" +
                "}"
    }

    companion object {

        private const val serialVersionUID = 1L
    }
}
